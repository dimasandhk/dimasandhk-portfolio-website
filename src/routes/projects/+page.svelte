<script lang="ts">
	import NotionPage from '$lib/components/NotionPage.svelte';
	import NotionBlock from '$lib/components/NotionBlock.svelte';
	import NotionGallery from '$lib/components/NotionGallery.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { projects, type ProjectCategory } from '$lib/data/projects.js';
	import { pageSEO } from '$lib/config/seo';
	import LayoutGrid from 'lucide-svelte/icons/layout-grid';
	import List from 'lucide-svelte/icons/list';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';

	let viewMode = $state<'gallery' | 'list'>('gallery');
	let selectedCategory = $state<string>('All');
	let scrollY = $state(0);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const categories = ['All', 'Achievements', 'Apps', 'Bots', 'System Testing / Utils'];

	let filteredProjects = $derived(
		selectedCategory === 'All'
			? projects
			: projects.filter((p) => p.category.includes(selectedCategory as ProjectCategory))
	);
</script>

<MetaTags
	title={pageSEO.projects.title}
	description={pageSEO.projects.description}
	keywords={pageSEO.projects.keywords}
	type={pageSEO.projects.type}
/>

<NotionPage
	title="Projects"
	icon="🚀"
	coverImage="/Banner_Linked_baru.png"
	mobileCoverImage="/Banner_Linked_mobile.png"
>
	<NotionBlock>
		<p class="text-[16px] leading-[1.5] mb-6">
			Here are some of my projects. More projects will be added soon.
		</p>
	</NotionBlock>

	<NotionBlock>
		<div class="flex flex-col gap-6 mt-8 mb-8">
			<!-- Header and View Toggle -->
			<div class="flex items-center justify-between border-b border-[var(--notion-border)] pb-2">
				<div class="flex items-center gap-2">
					<span class="text-xl">📂</span>
					<h2 class="text-xl font-semibold text-[var(--notion-text)]">All Projects</h2>
				</div>

				<button
					class="flex items-center gap-1 text-xs text-[#9b9a97] hover:bg-[var(--notion-hover)] px-2 py-1 rounded transition-colors"
					onclick={() => (viewMode = viewMode === 'gallery' ? 'list' : 'gallery')}
				>
					{#if viewMode === 'gallery'}
						<List size={14} />
						<span>List View</span>
					{:else}
						<LayoutGrid size={14} />
						<span>Gallery View</span>
					{/if}
				</button>
			</div>

			<!-- Filter Tabs -->
			<div class="flex flex-wrap gap-2 pb-2">
				{#each categories as category}
					<button
						class="px-3 py-1 rounded-full text-sm transition-all duration-200 border {selectedCategory ===
						category
							? 'bg-[var(--notion-text)] text-[var(--notion-bg)] border-[var(--notion-text)]'
							: 'bg-[var(--notion-bg)] text-[var(--notion-text)] border-[var(--notion-border)] hover:bg-[var(--notion-hover)]'}"
						onclick={() => (selectedCategory = category)}
					>
						{category}
					</button>
				{/each}
			</div>

			<!-- Content -->
			{#if filteredProjects.length > 0}
				<NotionGallery items={filteredProjects} {viewMode} />
			{:else}
				<div
					class="flex flex-col items-center justify-center p-12 text-[#9b9a97] border-2 border-dashed border-[var(--notion-border)] rounded-xl bg-[var(--notion-gray)]/30"
				>
					<span class="text-4xl mb-2">📭</span>
					<p>No projects found in this category yet.</p>
				</div>
			{/if}
		</div>
	</NotionBlock>

	<NotionBlock>
		<div class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[var(--notion-border)] pt-4">
			Built with 💓 by Dimas Andhika himself • {new Date().getFullYear()}
		</div>
	</NotionBlock>
</NotionPage>

<svelte:window bind:scrollY />

{#if scrollY > 300}
	<button
		class="fixed bottom-8 right-8 p-3 bg-[var(--notion-bg)] shadow-lg rounded-full border border-[var(--notion-border)] text-[var(--notion-text)] hover:bg-[var(--notion-hover)] transition-all z-50 cursor-pointer"
		onclick={scrollToTop}
		aria-label="Back to top"
	>
		<ArrowUp size={20} />
	</button>
{/if}
