<script lang="ts">
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import { pop } from '$lib/motion';

	interface Props {
		/** Scroll distance (px) after which the button appears. */
		threshold?: number;
	}

	let { threshold = 300 }: Props = $props();

	let scrollY = $state(0);
	const visible = $derived(scrollY > threshold);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />

{#if visible}
	<button
		class="group fixed bottom-8 right-8 p-3 bg-[var(--notion-bg)] shadow-lg rounded-full border border-[var(--notion-border)] text-[var(--notion-text)] hover:bg-[var(--notion-hover)] hover:-translate-y-0.5 active:scale-90 transition duration-200 z-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
		onclick={scrollToTop}
		aria-label="Back to top"
		transition:pop={{ y: 12, start: 0.8, duration: 220 }}
	>
		<ArrowUp size={20} class="transition-transform duration-300 group-hover:-translate-y-0.5" />
	</button>
{/if}
