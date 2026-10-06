/**
 * Lightweight, dependency-free motion helpers.
 *
 * Everything here animates only `transform` / `opacity` (compositor-friendly), shares a
 * single IntersectionObserver, and becomes a no-op under `prefers-reduced-motion`.
 * The visual side (keyframes, timings) lives in `routes/layout.css`.
 */

import type { Action } from 'svelte/action';
import type { TransitionConfig } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

let ready = false;
let resolveReady: () => void = () => {};
/** Resolves once the loading screen starts leaving, i.e. when entrance motion may begin. */
export const motionReady = new Promise<void>((resolve) => (resolveReady = resolve));

let navigatedAt = 0;

export function prefersReducedMotion() {
	return (
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

/** Unlocks entrance animations (gated by `html.motion-ready` in CSS). */
export function setMotionReady() {
	if (ready) return;
	ready = true;
	navigatedAt = performance.now();
	document.documentElement.classList.add('motion-ready');
	resolveReady();
}

/** Called after client-side navigations so in-view content waits for the page header to settle. */
export function markNavigation() {
	navigatedAt = performance.now();
}

// ---------------------------------------------------------------------------
// Svelte transitions (WAAPI-driven, so they need their own reduced-motion check)
// ---------------------------------------------------------------------------

/** Dialog-style entrance: a small rise plus a hint of scale. */
export function pop(
	_node: Element,
	{ duration = 240, delay = 0, y = 8, start = 0.97 } = {}
): TransitionConfig {
	if (prefersReducedMotion()) return { duration: 0 };
	return {
		delay,
		duration,
		easing: cubicOut,
		css: (t, u) =>
			`opacity: ${t}; transform: translate3d(0, ${u * y}px, 0) scale(${start + (1 - start) * t});`
	};
}

/** Icon swap: rotates and scales into place. */
export function spin(_node: Element, { duration = 320, from = -90 } = {}): TransitionConfig {
	if (prefersReducedMotion()) return { duration: 0 };
	return {
		duration,
		easing: cubicOut,
		css: (t, u) => `opacity: ${t}; transform: rotate(${u * from}deg) scale(${0.6 + 0.4 * t});`
	};
}

/** Short horizontal slide, used for breadcrumbs and inline swaps. */
export function slide(
	_node: Element,
	{ duration = 260, x = -6, delay = 0 } = {}
): TransitionConfig {
	if (prefersReducedMotion()) return { duration: 0 };
	return {
		delay,
		duration,
		easing: cubicOut,
		css: (t, u) => `opacity: ${t}; transform: translate3d(${u * x}px, 0, 0);`
	};
}

/** Plain fade that respects reduced motion. */
export function fadeIn(_node: Element, { duration = 200, delay = 0 } = {}): TransitionConfig {
	if (prefersReducedMotion()) return { duration: 0 };
	return { delay, duration, css: (t) => `opacity: ${t};` };
}

// ---------------------------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------------------------

type RevealVariant = 'up' | 'fade' | 'scale';
interface RevealOptions {
	variant?: RevealVariant;
	/** Extra delay in ms, added on top of the automatic batch stagger. */
	delay?: number;
}

const STAGGER_MS = 55;
const MAX_STAGGER_STEPS = 8;
/** Pushes content revealed together with a page header back so the header leads. */
const HEADER_LEAD_MS = 260;

const revealDelays = new WeakMap<Element, number>();
let observer: IntersectionObserver | null = null;

function getObserver() {
	observer ??= new IntersectionObserver(
		(entries) => {
			// Elements that enter together are staggered among themselves, so a row of
			// cards cascades no matter how far down the page it sits.
			const lead = !ready || performance.now() - navigatedAt < 200 ? HEADER_LEAD_MS : 0;
			let step = 0;
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				const delay =
					lead + (revealDelays.get(el) ?? 0) + Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS;
				el.style.setProperty('--reveal-delay', `${delay}ms`);
				el.setAttribute('data-revealed', '');
				observer!.unobserve(el);
				step++;
			}
		},
		{ rootMargin: '0px 0px -6% 0px', threshold: 0 }
	);
	return observer;
}

/**
 * Fades/slides an element in the first time it scrolls into view.
 * The hidden state is applied from JS, so content is never hidden without it.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;

	node.setAttribute('data-reveal', options?.variant ?? 'up');
	revealDelays.set(node, options?.delay ?? 0);
	getObserver().observe(node);

	return {
		destroy() {
			observer?.unobserve(node);
		}
	};
};

// ---------------------------------------------------------------------------
// Count-up numbers
// ---------------------------------------------------------------------------

/** Counts a numeric text node up from zero once it is visible. SSR output stays the final value. */
export const countUp: Action<HTMLElement, string> = (node, value) => {
	const target = Number.parseFloat(value);
	if (prefersReducedMotion() || !Number.isFinite(target)) return;

	const decimals = value.split('.')[1]?.length ?? 0;
	const duration = 1100;
	let frame = 0;
	let cancelled = false;

	node.textContent = (0).toFixed(decimals);

	const io = new IntersectionObserver(async ([entry]) => {
		if (!entry.isIntersecting) return;
		io.disconnect();
		await motionReady;
		if (cancelled) return;

		const start = performance.now() + HEADER_LEAD_MS;
		const tick = (now: number) => {
			const t = Math.min(Math.max((now - start) / duration, 0), 1);
			const eased = 1 - Math.pow(1 - t, 4);
			node.textContent = (target * eased).toFixed(decimals);
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	});
	io.observe(node);

	return {
		destroy() {
			cancelled = true;
			io.disconnect();
			cancelAnimationFrame(frame);
		}
	};
};

// ---------------------------------------------------------------------------
// Sliding active indicator
// ---------------------------------------------------------------------------

interface IndicatorOptions {
	/** Which descendant counts as active. */
	selector?: string;
	/** `fill` covers the active item; `bar` only tracks its vertical position/height. */
	mode?: 'fill' | 'bar';
}

/**
 * Moves a `[data-indicator]` child of the node underneath the active item, so tab and
 * nav selections glide instead of jumping. The node must be the items' offsetParent
 * (i.e. `position: relative`/`fixed`).
 */
export const indicator: Action<HTMLElement, IndicatorOptions | undefined> = (node, options) => {
	const pill = node.querySelector<HTMLElement>(':scope > [data-indicator]');
	if (!pill) return;

	const selector = options?.selector ?? '[aria-pressed="true"], [aria-current]';
	const mode = options?.mode ?? 'fill';

	function update() {
		const active = node.querySelector<HTMLElement>(selector);
		if (!active || !pill) {
			if (pill) pill.style.opacity = '0';
			return;
		}
		pill.style.opacity = '1';
		if (mode === 'bar') {
			pill.style.transform = `translate3d(0, ${active.offsetTop}px, 0)`;
			pill.style.height = `${active.offsetHeight}px`;
		} else {
			pill.style.transform = `translate3d(${active.offsetLeft}px, ${active.offsetTop}px, 0)`;
			pill.style.width = `${active.offsetWidth}px`;
			pill.style.height = `${active.offsetHeight}px`;
		}
	}

	update();
	// Enable transitions only after the first placement so the pill doesn't fly in from 0,0.
	const raf = requestAnimationFrame(() => node.setAttribute('data-indicator-ready', ''));

	const mutations = new MutationObserver(update);
	mutations.observe(node, {
		subtree: true,
		attributes: true,
		attributeFilter: ['aria-pressed', 'aria-current']
	});
	const resize = new ResizeObserver(update);
	resize.observe(node);

	return {
		update,
		destroy() {
			cancelAnimationFrame(raf);
			mutations.disconnect();
			resize.disconnect();
		}
	};
};

// ---------------------------------------------------------------------------
// Parallax
// ---------------------------------------------------------------------------

/**
 * Moves the node at `speed` × scroll. Uses a CSS scroll-driven animation where supported
 * (zero main-thread work), otherwise a rAF-throttled transform that stops once the
 * node's container is out of view.
 */
export const parallax: Action<HTMLElement, number | undefined> = (node, speed = 0.5) => {
	if (prefersReducedMotion()) return;

	if (CSS.supports('animation-timeline: scroll()')) {
		node.classList.add('parallax-scroll');
		return;
	}

	const limit = () => (node.parentElement?.offsetHeight ?? window.innerHeight) / speed;
	let frame = 0;
	let max = limit();

	const apply = () => {
		frame = 0;
		const y = Math.min(window.scrollY, max);
		node.style.transform = `translate3d(0, ${y * speed}px, 0)`;
	};
	const onScroll = () => {
		if (!frame) frame = requestAnimationFrame(apply);
	};
	const onResize = () => {
		max = limit();
		onScroll();
	};

	apply();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize, { passive: true });

	return {
		destroy() {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		}
	};
};
