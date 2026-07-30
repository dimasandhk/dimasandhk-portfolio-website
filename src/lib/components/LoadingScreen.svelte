<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[var(--notion-bg)]"
	transition:fade={{ duration: 300 }}
>
	<span class="text-9xl wave-hand" role="img" aria-label="Waving hand">👋</span>
	<span class="text-3xl font-semibold text-[var(--notion-text)]">Dimas Andhika</span>
</div>

<style>
	.wave-hand {
		display: inline-block;
		transform-origin: 70% 70%;
		animation: wave 1s ease-in-out infinite;
	}

	@keyframes wave {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		}
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
