<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import X from 'lucide-svelte/icons/x';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

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
		{#each items as item, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="group relative flex cursor-pointer flex-col overflow-hidden rounded border border-[var(--notion-border)] transition-all hover:bg-[var(--notion-hover)] hover:shadow-sm"
				onclick={() => (selectedItem = item)}
			>
				<div
					class="h-32 w-full bg-cover bg-center"
					style="background-image: {item.image ? `url(${item.image})` : getRandomGradient(i)}"
				></div>
				<div class="flex flex-col p-3">
					<div class="flex items-center gap-2 mb-1">
						<span class="text-lg">{item.icon || '📄'}</span>
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
			</div>
		{/each}

		{#if showViewMore}
			<!-- View More Placeholder -->
			<a
				href="/projects"
				class="group relative flex cursor-pointer flex-col overflow-hidden rounded border-2 border-dashed border-[var(--notion-border)] bg-[var(--notion-gray)]/50 hover:bg-[var(--notion-hover)] transition-colors p-4 items-center justify-center min-h-[250px]"
			>
				<div
					class="flex flex-col items-center gap-3 text-[#9b9a97] group-hover:text-[var(--notion-text)] transition-colors"
				>
					<span
						class="p-3 rounded-full bg-[var(--notion-border)] group-hover:bg-[var(--notion-gray)] transition-colors"
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
		{#each items as item, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="flex items-center gap-3 p-2 border-b border-[var(--notion-border)] hover:bg-[var(--notion-hover)] cursor-pointer transition-colors"
				onclick={() => (selectedItem = item)}
			>
				<span class="text-lg">{item.icon || '📄'}</span>
				<span class="font-medium text-[var(--notion-text)] flex-1">{item.title}</span>
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
			</div>
		{/each}

		{#if showViewMore}
			<!-- View More Placeholder (List View) -->
			<a
				href="/projects"
				class="flex items-center gap-3 p-2 border-b border-dashed border-[var(--notion-border)] hover:bg-[var(--notion-hover)] cursor-pointer transition-colors text-[#9b9a97] hover:text-[var(--notion-text)]"
			>
				<span class="text-lg flex items-center justify-center w-6 opacity-50"
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
		transition:fade={{ duration: 200 }}
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
			transition:fly={{ y: 20, duration: 300 }}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div
				class="h-48 w-full bg-cover bg-center shrink-0"
				style="background-image: {selectedItem.image
					? `url(${selectedItem.image})`
					: getRandomGradient(0)}"
			>
				<button
					class="absolute cursor-pointer top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 rounded text-white transition-colors"
					onclick={() => (selectedItem = null)}
					aria-label="Close modal"
					title="Close modal"
				>
					<X size={20} />
				</button>
			</div>

			<!-- Modal Content -->
			<div class="flex-1 overflow-y-auto p-8 md:p-12 notion-scrollbar">
				<div class="flex items-center gap-3 mb-6">
					<span class="text-4xl">{selectedItem.icon || '📄'}</span>
					<h2 class="text-3xl font-bold text-[var(--notion-text)]">{selectedItem.title}</h2>
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
										class="flex items-center gap-1.5 hover:bg-[var(--notion-hover)] px-1.5 py-0.5 -ml-1.5 rounded transition-colors text-[var(--notion-text)] underline decoration-[var(--notion-border)] hover:decoration-[var(--notion-text)]"
									>
										<span>↗</span>
										<span>Live Preview</span>
									</a>
								{/if}
								{#if selectedItem.sources}
									{#each selectedItem.sources as source}
										<a
											href={source.url}
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center gap-1.5 hover:bg-[var(--notion-hover)] px-1.5 py-0.5 -ml-1.5 rounded transition-colors text-[var(--notion-text)] underline decoration-[var(--notion-border)] hover:decoration-[var(--notion-text)]"
										>
											<span>⚡</span>
											<span>{source.label}</span>
										</a>
									{/each}
								{/if}
							</div>
						</div>
					{/if}
				</div>

				<div class="h-[1px] w-full bg-[var(--notion-border)] mb-8"></div>

				<div class="text-[var(--notion-text)] leading-relaxed space-y-4">
					{#if selectedItem.description}
						<p>{selectedItem.description}</p>
					{:else}
						<p class="text-[#9b9a97] italic">No description available.</p>
					{/if}
				</div>

				{#if selectedItem.gallery && selectedItem.gallery.length > 0}
					<div class="mt-8">
						<h3 class="text-[var(--notion-text)] font-semibold text-lg mb-4">Gallery</h3>
						<div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory notion-scrollbar">
							{#each selectedItem.gallery as image, i}
								<div class="shrink-0 snap-center first:pl-0 last:pr-0">
									<div
										class="h-48 md:h-64 aspect-video rounded-lg bg-cover bg-center shadow-sm border border-[var(--notion-border)]"
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
