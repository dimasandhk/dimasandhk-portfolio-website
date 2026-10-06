<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { fadeIn, pop, prefersReducedMotion, reveal } from '$lib/motion';
	import X from 'lucide-svelte/icons/x';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Link from 'lucide-svelte/icons/link';
	import Check from 'lucide-svelte/icons/check';
	import { onMount } from 'svelte';

	interface GalleryItem {
		title: string;
		image?: string;
		tags: string[];
		description?: string;
		icon?: string;
		timeline: string;
		preview?: string;
		sources?: { label: string; url: string }[];
		gallery?: string[];
	}

	interface Props {
		items: GalleryItem[];
		viewMode?: 'gallery' | 'list';
		showViewMore?: boolean;
	}

	let { items, viewMode = 'gallery', showViewMore = false }: Props = $props();

	let selectedItem = $state<GalleryItem | null>(null);
	let isCopied = $state(false);

	// Remaining cards glide into place when a filter adds or removes items.
	const flipDuration = () => (prefersReducedMotion() ? 0 : 320);

	onMount(() => {
		const hash = window.location.hash.slice(1);
		if (hash) {
			const project = items.find(
				(item) => item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash
			);
			if (project) {
				selectedItem = project;
			}
		}
	});

	$effect(() => {
		if (selectedItem) {
			const hash = selectedItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
			window.history.replaceState(null, '', `#${hash}`);
		} else {
			window.history.replaceState(null, '', window.location.pathname + window.location.search);
		}
	});

	async function copyProjectLink() {
		if (selectedItem) {
			const url = new URL(window.location.href);
			const hash = selectedItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
			url.hash = hash;
			await navigator.clipboard.writeText(url.toString());
			isCopied = true;
			setTimeout(() => {
				isCopied = false;
			}, 2000);
		}
	}

	function getRandomGradient(index: number) {
		const gradients = [
			'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
			'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
			'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
			'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)'
		];
		return gradients[index % gradients.length];
	}
</script>

{#if viewMode === 'gallery'}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
		{#each items as item, i (item.title)}
			<button
				use:reveal={{ variant: 'scale' }}
				animate:flip={{ duration: flipDuration(), easing: cubicOut }}
				out:fadeIn={{ duration: 140 }}
				class="group relative flex cursor-pointer flex-col overflow-hidden rounded border border-[var(--notion-border)] transition duration-200 ease-out hover:bg-[var(--notion-hover)] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] w-full text-left focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
				onclick={() => (selectedItem = item)}
			>
				<div class="h-32 w-full overflow-hidden">
					<div
						class="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
						style="background-image: {item.image ? `url(${item.image})` : getRandomGradient(i)}"
					></div>
				</div>
				<div class="flex flex-col p-3">
					<div class="flex items-center gap-2 mb-1">
						<span class="card-emoji text-lg">{item.icon || '📄'}</span>
						<span class="font-medium text-[var(--notion-text)]">{item.title}</span>
					</div>
					<div class="flex flex-wrap gap-1 mt-2">
						{#each item.tags.slice(0, 5) as tag}
							<span
								class="rounded bg-[var(--notion-gray-bg)] px-1.5 py-0.5 text-xs text-[var(--notion-text)]/80"
								>{tag}</span
							>
						{/each}
						{#if item.tags.length > 5}
							<span
								class="rounded bg-[var(--notion-gray-bg)] px-1.5 py-0.5 text-xs text-[var(--notion-text)]/80"
								>+{item.tags.length - 5}</span
							>
						{/if}
					</div>
				</div>
			</button>
		{/each}

		{#if showViewMore}
			<!-- View More Placeholder -->
			<a
				href="/projects"
				use:reveal={{ variant: 'scale' }}
				class="group relative flex cursor-pointer flex-col overflow-hidden rounded border-2 border-dashed border-[var(--notion-border)] bg-[var(--notion-gray)]/50 hover:bg-[var(--notion-hover)] hover:border-[#9b9a97] active:scale-[0.99] transition duration-200 p-4 items-center justify-center min-h-[250px] focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
			>
				<div
					class="flex flex-col items-center gap-3 text-[#9b9a97] group-hover:text-[var(--notion-text)] transition-colors"
				>
					<span
						class="p-3 rounded-full bg-[var(--notion-border)] group-hover:bg-[var(--notion-gray)] transition duration-300 ease-out group-hover:translate-x-1"
					>
						<ArrowRight size={24} />
					</span>
					<span class="font-medium">View More Projects</span>
				</div>
			</a>
		{/if}
	</div>
{:else}
	<div class="flex flex-col w-full">
		{#each items as item (item.title)}
			<button
				use:reveal={{ variant: 'fade' }}
				animate:flip={{ duration: flipDuration(), easing: cubicOut }}
				out:fadeIn={{ duration: 140 }}
				class="group flex items-center gap-3 p-2 border-b border-[var(--notion-border)] hover:bg-[var(--notion-hover)] cursor-pointer transition-colors w-full text-left focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
				onclick={() => (selectedItem = item)}
			>
				<span class="card-emoji text-lg">{item.icon || '📄'}</span>
				<span
					class="font-medium text-[var(--notion-text)] flex-1 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
					>{item.title}</span
				>
				<div class="flex gap-1">
					{#each item.tags.slice(0, 3) as tag}
						<span
							class="rounded bg-[var(--notion-gray-bg)] px-1.5 py-0.5 text-xs text-[var(--notion-text)]/80"
							>{tag}</span
						>
					{/each}
					{#if item.tags.length > 3}
						<span class="text-xs text-[#9b9a97] px-1">+{item.tags.length - 3}</span>
					{/if}
				</div>
			</button>
		{/each}

		{#if showViewMore}
			<!-- View More Placeholder (List View) -->
			<a
				href="/projects"
				use:reveal={{ variant: 'fade' }}
				class="group flex items-center gap-3 p-2 border-b border-dashed border-[var(--notion-border)] hover:bg-[var(--notion-hover)] cursor-pointer transition-colors text-[#9b9a97] hover:text-[var(--notion-text)] focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
			>
				<span
					class="text-lg flex items-center justify-center w-6 opacity-50 transition-transform duration-300 ease-out group-hover:translate-x-1"
					><ArrowRight size={16} /></span
				>
				<span class="font-medium italic flex-1">View More Projects...</span>
			</a>
		{/if}
	</div>
{/if}

<!-- Project Details Modal -->
{#if selectedItem}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-12 !mb-0"
		transition:fadeIn={{ duration: 200 }}
		onclick={(e) => {
			if (e.target === e.currentTarget) selectedItem = null;
		}}
		onkeydown={(e) => {
			if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
				e.preventDefault();
				selectedItem = null;
			}
		}}
		role="button"
		tabindex="0"
	>
		<div
			class="relative w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] bg-[var(--notion-bg)] rounded-xl shadow-2xl flex flex-col overflow-hidden"
			in:pop={{ duration: 300, y: 16, start: 0.96 }}
			out:pop={{ duration: 160, y: 6 }}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="relative h-48 w-full shrink-0 overflow-hidden">
				<div
					class="modal-cover h-full w-full bg-cover bg-center"
					style="background-image: {selectedItem.image
						? `url(${selectedItem.image})`
						: getRandomGradient(0)}"
				></div>
				<button
					class="absolute cursor-pointer top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 rounded text-white transition duration-200 hover:rotate-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
					onclick={() => (selectedItem = null)}
					aria-label="Close modal"
					title="Close modal"
				>
					<X size={20} />
				</button>
			</div>

			<!-- Modal Content -->
			<div class="modal-body flex-1 overflow-y-auto p-8 md:p-12 notion-scrollbar">
				<div class="flex items-center gap-3 mb-6 pr-8">
					<span class="wave-on-hover text-4xl">{selectedItem.icon || '📄'}</span>
					<h2 class="text-3xl font-bold text-[var(--notion-text)]">{selectedItem.title}</h2>
					<button
						class="flex items-center gap-1.5 px-2 py-1 ml-auto text-sm text-[#9b9a97] hover:text-[var(--notion-text)] hover:bg-[var(--notion-hover)] rounded transition active:scale-95 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
						onclick={copyProjectLink}
						aria-label="Copy link to project"
					>
						{#if isCopied}
							<span class="flex items-center gap-1.5" in:pop={{ y: 0, start: 0.6, duration: 220 }}>
								<Check size={16} class="text-green-500" />
								<span class="hidden sm:inline text-green-500">Copied!</span>
							</span>
						{:else}
							<span class="flex items-center gap-1.5" in:fadeIn={{ duration: 160 }}>
								<Link size={16} />
								<span class="hidden sm:inline">Copy Link</span>
							</span>
						{/if}
					</button>
				</div>

				<!-- Properties -->
				<div class="flex flex-col gap-3 mb-8">
					<!-- Timeline -->
					<div class="flex gap-4 items-center text-sm">
						<span class="w-24 text-[#9b9a97] flex-shrink-0">Timeline</span>
						<span class="text-[var(--notion-text)]">{selectedItem.timeline}</span>
					</div>

					<!-- Tags -->
					<div class="flex gap-4 items-start text-sm">
						<span class="w-24 text-[#9b9a97] flex-shrink-0 pt-0.5">Tags</span>
						<div class="flex flex-wrap gap-1">
							{#each selectedItem.tags as tag}
								<span
									class="rounded bg-[var(--notion-gray)] px-2 py-0.5 text-xs text-[var(--notion-text)]"
									>{tag}</span
								>
							{/each}
						</div>
					</div>
					<!-- Links -->
					{#if selectedItem.preview || (selectedItem.sources && selectedItem.sources.length > 0)}
						<div class="flex gap-4 items-start text-sm">
							<span class="w-24 text-[#9b9a97] flex-shrink-0 pt-0.5">Links</span>
							<div class="flex flex-col gap-1">
								{#if selectedItem.preview}
									<a
										href={selectedItem.preview}
										target="_blank"
										rel="noopener noreferrer"
										class="group flex items-center gap-1.5 hover:bg-[var(--notion-hover)] px-1.5 py-0.5 -ml-1.5 rounded transition-colors text-[var(--notion-text)] underline decoration-[var(--notion-border)] hover:decoration-[var(--notion-text)]"
									>
										<span
											class="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
											>↗</span
										>
										<span>Live Preview</span>
									</a>
								{/if}
								{#if selectedItem.sources}
									{#each selectedItem.sources as source}
										<a
											href={source.url}
											target="_blank"
											rel="noopener noreferrer"
											class="group flex items-center gap-1.5 hover:bg-[var(--notion-hover)] px-1.5 py-0.5 -ml-1.5 rounded transition-colors text-[var(--notion-text)] underline decoration-[var(--notion-border)] hover:decoration-[var(--notion-text)]"
										>
											<span class="inline-block transition-transform duration-200 group-hover:scale-125"
												>⚡</span
											>
											<span>{source.label}</span>
										</a>
									{/each}
								{/if}
							</div>
						</div>
					{/if}
				</div>

				<div class="modal-rule h-[1px] w-full bg-[var(--notion-border)] mb-8"></div>

				<div class="text-[var(--notion-text)] leading-relaxed space-y-4">
					{#if selectedItem.description}
						<p class="whitespace-pre-line">{selectedItem.description}</p>
					{:else}
						<p class="text-[#9b9a97] italic">No description available.</p>
					{/if}
				</div>

				{#if selectedItem.gallery && selectedItem.gallery.length > 0}
					<div class="mt-8">
						<h3 class="text-[var(--notion-text)] font-semibold text-lg mb-4">Gallery</h3>
						<div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory notion-scrollbar">
							{#each selectedItem.gallery as image, i}
								<div
									class="shrink-0 snap-center first:pl-0 last:pr-0 overflow-hidden rounded-lg border border-[var(--notion-border)] shadow-sm"
								>
									<div
										class="h-48 md:h-64 aspect-video bg-cover bg-center transition-transform duration-500 ease-out hover:scale-[1.03]"
										style="background-image: url({image})"
										role="img"
										aria-label={`Gallery image ${i + 1}`}
									></div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.card-emoji {
		display: inline-block;
		transition: rotate 360ms var(--ease-spring);
	}
	:global(.group:hover) .card-emoji {
		rotate: -10deg;
	}

	@media (prefers-reduced-motion: no-preference) {
		/* Modal sections cascade in after the dialog lands. */
		.modal-cover {
			animation: cover-settle 900ms var(--ease-out) backwards;
		}
		.modal-body > * {
			animation: reveal-up 420ms var(--ease-out) backwards;
		}
		.modal-body > :nth-child(1) {
			animation-delay: 90ms;
		}
		.modal-body > :nth-child(2) {
			animation-delay: 140ms;
		}
		.modal-body > :nth-child(n + 4) {
			animation-delay: 240ms;
		}
		.modal-body > .modal-rule {
			transform-origin: left;
			animation: draw-x 700ms var(--ease-out) 190ms backwards;
		}
	}

	.notion-scrollbar::-webkit-scrollbar {
		width: 10px;
	}
	.notion-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.notion-scrollbar::-webkit-scrollbar-thumb {
		background-color: var(--notion-border);
		border-radius: 5px;
	}
	.notion-scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: var(--notion-hover);
	}
</style>
