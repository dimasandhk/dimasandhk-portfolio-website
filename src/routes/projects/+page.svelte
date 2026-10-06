<script lang="ts">
	import NotionPage from '$lib/components/NotionPage.svelte';
	import NotionBlock from '$lib/components/NotionBlock.svelte';
	import NotionGallery from '$lib/components/NotionGallery.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { projects, type ProjectCategory } from '$lib/data/projects.js';
	import { pageSEO } from '$lib/config/seo';
	import LayoutGrid from 'lucide-svelte/icons/layout-grid';
	import List from 'lucide-svelte/icons/list';
	import Search from 'lucide-svelte/icons/search';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import { fadeIn, indicator, reveal, spin } from '$lib/motion';

	let viewMode = $state<'gallery' | 'list'>('gallery');
	let selectedCategory = $state<string>('All');
	let searchQuery = $state<string>('');

	const categories = ['All', 'Achievements', 'Apps', 'Bots', 'System Testing / Utils'];

	let filteredProjects = $derived(
		projects.filter((p) => {
			const matchesCategory =
				selectedCategory === 'All' || p.category.includes(selectedCategory as ProjectCategory);
			const matchesSearch =
				searchQuery.trim() === '' ||
				p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(p.tags && p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
			return matchesCategory && matchesSearch;
		})
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
		<p class="text-[16px] leading-[1.5] mb-6" use:reveal>
			Here are some of my projects. More projects will be added soon.
		</p>
	</NotionBlock>

	<NotionBlock>
		<div class="flex flex-col gap-6 mt-8 mb-8">
			<!-- Header and View Toggle -->
			<div class="section-rule flex items-center justify-between pb-2" use:reveal>
				<div class="flex items-center gap-2">
					<span class="section-emoji text-xl">📂</span>
					<h2 class="text-xl font-semibold text-[var(--notion-text)]">All Projects</h2>
				</div>

				<button
					class="flex items-center gap-1 text-xs text-[#9b9a97] hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)] px-2 py-1 rounded transition active:scale-95 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
					onclick={() => (viewMode = viewMode === 'gallery' ? 'list' : 'gallery')}
				>
					{#key viewMode}
						<span class="flex" in:spin={{ from: -45, duration: 260 }}>
							{#if viewMode === 'gallery'}
								<List size={14} />
							{:else}
								<LayoutGrid size={14} />
							{/if}
						</span>
					{/key}
					<span>{viewMode === 'gallery' ? 'List View' : 'Gallery View'}</span>
				</button>
			</div>

			<!-- Search Bar -->
			<div class="group relative w-full" use:reveal>
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<Search
						size={16}
						class="text-[#9b9a97] transition duration-300 ease-out group-focus-within:text-[var(--notion-text)] group-focus-within:scale-110 group-focus-within:-rotate-12"
					/>
				</div>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search projects by title, description, or tags..."
					class="w-full pl-9 pr-4 py-2 bg-[var(--notion-bg)] border border-[var(--notion-border)] rounded-md text-sm text-[var(--notion-text)] placeholder:text-[#9b9a97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:border-transparent transition-all"
				/>
			</div>

			<!-- Filter Tabs -->
			<div class="relative flex flex-wrap gap-2 pb-2" use:reveal use:indicator>
				<span data-indicator class="rounded-full bg-[var(--notion-text)]" aria-hidden="true"></span>
				{#each categories as category}
					<button
						class="indicator-item px-3 py-1 rounded-full text-sm transition duration-200 active:scale-95 border focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)] {selectedCategory ===
						category
							? 'bg-[var(--notion-text)] text-[var(--notion-bg)] border-[var(--notion-text)]'
							: 'bg-[var(--notion-bg)] text-[var(--notion-text)] border-[var(--notion-border)] hover:bg-[var(--notion-hover)]'}"
						onclick={() => (selectedCategory = category)}
						aria-pressed={selectedCategory === category}
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
					in:fadeIn={{ duration: 220 }}
				>
					<span class="empty-emoji text-4xl mb-2">📭</span>
					<p>No projects found in this category yet.</p>
				</div>
			{/if}
		</div>
	</NotionBlock>

	<NotionBlock>
		<div
			class="beat-parent text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[var(--notion-border)] pt-4"
			use:reveal={{ variant: 'fade' }}
		>
			Built with <span class="heartbeat">💓</span> by Dimas Andhika himself • {new Date().getFullYear()}
		</div>
	</NotionBlock>
</NotionPage>

<BackToTop />

<style>
	@media (prefers-reduced-motion: no-preference) {
		.empty-emoji {
			display: inline-block;
			animation: pop-in 520ms var(--ease-spring) 80ms backwards;
		}
	}
</style>
