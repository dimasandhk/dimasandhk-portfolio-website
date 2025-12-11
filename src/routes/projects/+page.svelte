<script lang="ts">
    import NotionPage from '$lib/components/NotionPage.svelte';
    import NotionBlock from '$lib/components/NotionBlock.svelte';
    import NotionGallery from '$lib/components/NotionGallery.svelte';
    import { projects } from '$lib/data/projects.js';
    import LayoutGrid from 'lucide-svelte/icons/layout-grid';
    import List from 'lucide-svelte/icons/list';

    let viewMode = $state<'gallery' | 'list'>('gallery');
    let selectedCategory = $state<string>('All');

    const categories = ['All', 'Achievements', 'Apps', 'Bots', 'System Testing / Utils'];

    let filteredProjects = $derived(
        selectedCategory === 'All' 
            ? projects 
            : projects.filter(p => p.category === selectedCategory)
    );
</script>

<NotionPage title="Projects" icon="🚀" coverImage="/Banner_Linked_baru.png"> 
    <NotionBlock>
        <div class="flex flex-col gap-6 mt-8 mb-8">
            <!-- Header and View Toggle -->
            <div class="flex items-center justify-between border-b border-[#e9e9e7] pb-2">
                <div class="flex items-center gap-2">
                    <span class="text-xl">📂</span>
                    <h2 class="text-xl font-semibold text-[#37352f]">All Projects</h2>
                </div>
                
                <button 
                    class="flex items-center gap-1 text-xs text-[#9b9a97] hover:bg-[#e9e9e7] px-2 py-1 rounded transition-colors"
                    onclick={() => viewMode = viewMode === 'gallery' ? 'list' : 'gallery'}
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
                        class="px-3 py-1 rounded-full text-sm transition-all duration-200 border {selectedCategory === category ? 'bg-[#37352f] text-white border-[#37352f]' : 'bg-white text-[#37352f] border-[#e9e9e7] hover:bg-[#efefef]'}"
                        onclick={() => selectedCategory = category}
                    >
                        {category}
                    </button>
                {/each}
            </div>

            <!-- Content -->
            {#if filteredProjects.length > 0}
                <NotionGallery items={filteredProjects} viewMode={viewMode} />
            {:else}
                <div class="flex flex-col items-center justify-center p-12 text-[#9b9a97] border-2 border-dashed border-[#e9e9e7] rounded-xl bg-[#f7f7f5]/30">
                    <span class="text-4xl mb-2">📭</span>
                    <p>No projects found in this category yet.</p>
                </div>
            {/if}
        </div>
    </NotionBlock>

    <NotionBlock>
        <div class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[#e9e9e7] pt-4">
            Built with 💓 by Dimas Andhika himself • {new Date().getFullYear()}
        </div>
    </NotionBlock>
</NotionPage>
