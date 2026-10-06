<script lang="ts">
	import './layout.css';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import FloatingNav from '$lib/components/FloatingNav.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import {
		fadeIn,
		markNavigation,
		pop,
		prefersReducedMotion,
		setMotionReady,
		slide,
		spin
	} from '$lib/motion';
	import Contact from 'lucide-svelte/icons/contact';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';

	let { children } = $props();

	let isContactOpen = $state(false);
	let theme = $state<'dark' | 'light'>('dark');
	let isLoading = $state(true);
	let scrollY = $state(0);

	const isScrolled = $derived(scrollY > 4);

	const contacts = [
		{
			href: 'mailto:dimasandhikadiputra@gmail.com',
			emoji: '📧',
			bg: 'var(--notion-red-bg)',
			label: 'Email',
			desc: 'dimasandhikadiputra@gmail.com'
		},
		{
			href: 'https://www.linkedin.com/in/dimasandhk/',
			emoji: '💼',
			bg: 'var(--notion-gray-bg)',
			label: 'LinkedIn',
			desc: 'Connect professionally'
		},
		{
			href: 'https://github.com/dimasandhk',
			emoji: '💻',
			bg: 'var(--notion-blue-bg)',
			label: 'GitHub',
			desc: 'Check out my code'
		},
		{
			href: 'https://instagram.com/dimas.andhk',
			emoji: '📸',
			bg: 'var(--notion-pink-bg)',
			label: 'Instagram',
			desc: 'Follow my daily updates'
		}
	];

	function toggleContact() {
		isContactOpen = !isContactOpen;
	}

	function applyTheme(next: 'dark' | 'light') {
		theme = next;
		localStorage.setItem('theme', next);
		document.documentElement.classList.toggle('dark', next === 'dark');
	}

	function toggleTheme() {
		const next = theme === 'dark' ? 'light' : 'dark';
		if (!document.startViewTransition || prefersReducedMotion()) {
			applyTheme(next);
			return;
		}
		// Crossfade the whole page between themes instead of snapping colors.
		const root = document.documentElement;
		root.dataset.vt = 'theme';
		const transition = document.startViewTransition(async () => {
			applyTheme(next);
			await tick();
		});
		transition.finished.finally(() => delete root.dataset.vt);
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition || prefersReducedMotion()) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate(markNavigation);

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			theme = storedTheme as 'dark' | 'light';
		} else {
			theme = 'dark';
			localStorage.setItem('theme', 'dark');
		}

		document.documentElement.classList.toggle('dark', theme === 'dark');

		const timer = setTimeout(() => {
			isLoading = false;
			// Entrance animations start as the loading screen fades, not underneath it.
			setMotionReady();
		}, 1200);

		return () => clearTimeout(timer);
	});

	const routeConfig: Record<string, { icon: string; label: string }> = {
		linktree: { icon: '🔗', label: 'Links' },
		projects: { icon: '🚀', label: 'Projects' }
	};
</script>

<svelte:window
	bind:scrollY
	onkeydown={(e) => {
		if (e.key === 'Escape' && isContactOpen) isContactOpen = false;
	}}
/>

{#if isLoading}
	<LoadingScreen />
{/if}

<div class="min-h-screen w-full text-[var(--notion-text)] transition-colors duration-200">
	<!-- Main Content -->
	<main class="w-full relative">
		<!-- Minimal Topbar like public Notion -->
		<div
			class="topbar sticky top-0 z-10 flex h-11 items-center justify-between px-3 bg-[var(--notion-bg)]/95 backdrop-blur-sm border-b transition-colors duration-300 {isScrolled
				? 'border-[var(--notion-border)]'
				: 'border-transparent'}"
		>
			<div class="flex items-center gap-1 text-sm text-[var(--notion-text)]">
				<a
					href="/"
					class="wave-parent flex items-center gap-1 hover:bg-[var(--notion-hover)] px-2 py-1 rounded cursor-pointer transition text-[var(--notion-text)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
				>
					<span class="wave-on-hover text-base">👋</span>
					<span class="font-medium sm:hidden">Dimas' Portfolio</span>
					<span class="font-medium hidden sm:inline">Dimas Andhika's Portfolio</span>
				</a>

				{#key $page.url.pathname}
					{#if $page.url.pathname !== '/'}
						<span class="flex items-center gap-1" in:slide>
							{#each $page.url.pathname.split('/').filter(Boolean) as segment}
								<span class="text-[#9b9a97] px-0.5">/</span>
								<div
									class="flex items-center gap-1 hover:bg-[var(--notion-hover)] px-2 py-1 rounded cursor-pointer transition-colors"
								>
									{#if routeConfig[segment]}
										<span class="text-base">{routeConfig[segment].icon}</span>
										<span class="font-medium">{routeConfig[segment].label}</span>
									{:else}
										<span class="text-base">📄</span>
										<span class="font-medium capitalize">{segment}</span>
									{/if}
								</div>
							{/each}
						</span>
					{/if}
				{/key}
			</div>
			<div class="flex items-center gap-2">
				<button
					onclick={toggleTheme}
					class="flex items-center justify-center h-7 w-7 rounded hover:bg-[var(--notion-hover)] transition text-[var(--notion-text)] cursor-pointer active:scale-90 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
					aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
					title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
				>
					{#key theme}
						<span class="flex" in:spin>
							{#if theme === 'dark'}
								<Sun size={16} />
							{:else}
								<Moon size={16} />
							{/if}
						</span>
					{/key}
				</button>
				<button
					onclick={toggleContact}
					class="group flex items-center gap-1.5 text-sm cursor-pointer font-medium hover:bg-[var(--notion-hover)] px-2 py-1 rounded transition text-[var(--notion-text)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
					aria-expanded={isContactOpen}
				>
					<Contact size={16} class="transition-transform duration-300 group-hover:-rotate-8" />
					<span>Contact</span>
				</button>
			</div>

			<!-- Reading progress hairline (scroll-driven, no JS) -->
			<div class="scroll-progress" aria-hidden="true"></div>
		</div>

		{@render children()}

		<FloatingNav />

		<!-- Contact Modal -->
		{#if isContactOpen}
			<!-- Backdrop -->
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
				transition:fadeIn={{ duration: 180 }}
				onclick={(e) => {
					if (e.target === e.currentTarget) isContactOpen = false;
				}}
				role="button"
				tabindex="0"
				onkeydown={(e) => e.key === 'Escape' && (isContactOpen = false)}
			>
				<!-- Modal Content -->
				<div
					class="w-full max-w-sm rounded-xl bg-[var(--notion-bg)] p-6 shadow-xl border border-[var(--notion-border)]"
					in:pop
					out:pop={{ duration: 150, y: 4 }}
					role="dialog"
					aria-modal="true"
					tabindex="-1"
				>
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-semibold text-[var(--notion-text)]">Get in Touch</h3>
						<button
							onclick={() => (isContactOpen = false)}
							class="text-[#9b9a97] cursor-pointer hover:text-[var(--notion-text)] transition duration-200 hover:rotate-90 p-1 rounded focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
							aria-label="Close contact modal"
							title="Close contact modal"
						>
							✕
						</button>
					</div>

					<p class="text-sm text-[var(--notion-text)] mb-6 leading-relaxed">
						Feel free to reach out for collaborations, opportunities, or just a friendly hello!
					</p>

					<div class="space-y-2">
						{#each contacts as contact, i}
							{@const external = contact.href.startsWith('http')}
							<a
								href={contact.href}
								target={external ? '_blank' : undefined}
								rel={external ? 'noopener noreferrer' : undefined}
								class="stagger-item flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--notion-gray)] transition-colors group focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
								style="--i: {i}"
							>
								<span
									class="flex h-8 w-8 items-center justify-center rounded text-lg transition duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6"
									style="background-color: {contact.bg}">{contact.emoji}</span
								>
								<div class="flex flex-col flex-1 min-w-0">
									<span class="text-sm font-medium text-[var(--notion-text)]">{contact.label}</span>
									<span class="text-xs text-[#787774] truncate">{contact.desc}</span>
								</div>
								<ArrowUpRight
									size={16}
									class="text-[#9b9a97] opacity-0 -translate-x-1 translate-y-1 transition duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
								/>
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	.topbar {
		view-transition-name: topbar;
	}

	.scroll-progress {
		display: none;
	}

	@supports (animation-timeline: scroll()) {
		.scroll-progress {
			display: block;
			position: absolute;
			inset: auto 0 -1px 0;
			height: 1.5px;
			background: var(--notion-text);
			opacity: 0.28;
			transform: scaleX(0);
			transform-origin: left;
			animation: scroll-progress linear both;
			animation-timeline: scroll(root);
		}
	}

	@keyframes scroll-progress {
		to {
			transform: scaleX(1);
		}
	}
</style>
