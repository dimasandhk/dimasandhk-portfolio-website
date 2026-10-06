<script lang="ts">
	import { fadeIn } from '$lib/motion';

	const words = ['Dimas', 'Andhika'];
</script>

<div
	class="loading fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[var(--notion-bg)]"
	out:fadeIn={{ duration: 320 }}
>
	<span class="text-9xl wave-hand" role="img" aria-label="Waving hand">👋</span>
	<span class="text-3xl font-semibold text-[var(--notion-text)]">
		{#each words as word, i}
			<span class="loading-word" style="--w: {i}">{word}</span>{i < words.length - 1 ? ' ' : ''}
		{/each}
	</span>
	<div class="loading-track" aria-hidden="true">
		<div class="loading-fill"></div>
	</div>
</div>

<style>
	.wave-hand {
		display: inline-block;
		transform-origin: 70% 70%;
		animation:
			hand-in 520ms cubic-bezier(0.34, 1.5, 0.64, 1) backwards,
			wave 1s ease-in-out 300ms infinite;
	}

	.loading-word {
		display: inline-block;
		animation: word-in 600ms cubic-bezier(0.22, 1, 0.36, 1) calc(120ms + var(--w) * 90ms) backwards;
	}

	.loading-track {
		width: 6rem;
		height: 2px;
		border-radius: 1px;
		background: var(--notion-border);
		overflow: hidden;
	}

	.loading-fill {
		height: 100%;
		background: var(--notion-text);
		opacity: 0.5;
		transform-origin: left;
		animation: fill 1.1s cubic-bezier(0.65, 0, 0.35, 1) both;
	}

	@keyframes hand-in {
		from {
			opacity: 0;
			transform: scale(0.5) rotate(-20deg);
		}
	}

	@keyframes fill {
		from {
			transform: scaleX(0);
		}
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

	@media (prefers-reduced-motion: reduce) {
		.wave-hand,
		.loading-word,
		.loading-fill {
			animation: none;
		}
	}
</style>
