<script lang="ts">
    interface GalleryItem {
        title: string;
        image?: string; // fallback to gradient
        tags: string[];
    }

    interface Props {
        items: GalleryItem[];
    }

    let { items }: Props = $props();

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

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
    {#each items as item, i}
        <div class="group relative flex cursor-pointer flex-col overflow-hidden rounded shadow-[0_0_0_1px_rgba(15,15,15,0.1)] transition-shadow hover:bg-[#f7f7f5] hover:shadow-[0_0_0_1px_rgba(15,15,15,0.2),0_2px_4px_rgba(15,15,15,0.1)]">
            <div class="h-32 w-full bg-cover bg-center" style="background-image: {item.image ? `url(${item.image})` : getRandomGradient(i)}"></div>
            <div class="flex flex-col p-3">
                 <div class="flex items-center gap-2 mb-1">
                    <span class="text-lg">📄</span>
                    <span class="font-medium text-[#37352f]">{item.title}</span>
                 </div>
                 <div class="flex flex-wrap gap-1 mt-2">
                    {#each item.tags as tag}
                        <span class="rounded bg-[#e3e2e0] px-1.5 py-0.5 text-xs text-[#505558]">{tag}</span>
                    {/each}
                 </div>
            </div>
        </div>
    {/each}
</div>
