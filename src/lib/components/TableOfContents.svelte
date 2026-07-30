<script lang="ts">
	interface Section {
		id: string;
		label: string;
	}

	interface Props {
		sections: Section[];
		/** Distance from the viewport top at which a section counts as active.
		 *  Clears the 44px sticky topbar with a little breathing room. */
		offset?: number;
	}

	let { sections, offset = 72 }: Props = $props();

	let activeId = $state('');

	// Falls back to the first section so the nav is never rendered with nothing active
	// (notably during SSR, before the scroll listener has run).
	const currentId = $derived(activeId || sections[0]?.id || '');

	function updateActive() {
		// The active section is the last one whose top has scrolled past the offset.
		let current = sections[0]?.id ?? '';
		for (const section of sections) {
			const el = document.getElementById(section.id);
			if (el && el.getBoundingClientRect().top <= offset) {
				current = section.id;
			}
		}
		activeId = current;
	}

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		// Offset the jump so the heading isn't hidden behind the sticky topbar.
		const top = el.getBoundingClientRect().top + window.scrollY - offset + 8;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	$effect(() => {
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(updateActive);
		};

		updateActive();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<!-- Sits in the gutter left of the 900px content column, so it never collides with
     FloatingNav on the right. Width is kept under the ~190px gutter available at the
     xl breakpoint so it never overlaps the content column. -->
<nav
	class="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block w-[150px]"
	aria-label="On this page"
>
	<div class="text-[11px] font-medium uppercase tracking-wide text-[#9b9a97] mb-2 pl-3">
		On this page
	</div>
	<ul class="flex flex-col">
		{#each sections as section}
			{@const isActive = currentId === section.id}
			<li>
				<button
					onclick={() => scrollToSection(section.id)}
					class="w-full text-left text-sm py-1.5 pl-3 border-l-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]
					{isActive
						? 'border-[var(--notion-text)] text-[var(--notion-text)] font-medium'
						: 'border-[var(--notion-border)] text-[#9b9a97] hover:text-[var(--notion-text)] hover:border-[#9b9a97]'}"
					aria-current={isActive ? 'true' : undefined}
				>
					{section.label}
				</button>
			</li>
		{/each}
	</ul>
</nav>
