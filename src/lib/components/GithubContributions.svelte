<script lang="ts">
    import { onMount } from 'svelte';
    import NotionBlock from './NotionBlock.svelte';

    export let username = 'dimasandhk';

    let selectedYear = new Date().getFullYear();
    let years = Array.from({ length: 6 }, (_, i) => 2025 - i); // 2025, 2024, ..., 2020
    let loading = true;
    let error = '';
    
    let dataCache: Record<number, any> = {};
    let contributions: any[] = [];
    let totalContributions = 0;

    async function fetchData(year: number) {
        if (dataCache[year]) {
            contributions = dataCache[year].contributions;
            totalContributions = dataCache[year].total;
            return;
        }

        loading = true;
        error = '';
        try {
            const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            
            dataCache[year] = {
                contributions: data.contributions,
                total: data.total[year] || 0
            };
            
            contributions = dataCache[year].contributions;
            totalContributions = dataCache[year].total;
        } catch (e) {
            error = 'Failed to load contributions';
            console.error(e);
        } finally {
            loading = false;
        }
    }

    $: fetchData(selectedYear);

    function getLevelColor(level: number) {
        switch (level) {
            case 0: return 'bg-[var(--contrib-0)]';
            case 1: return 'bg-[var(--contrib-1)]';
            case 2: return 'bg-[var(--contrib-2)]';
            case 3: return 'bg-[var(--contrib-3)]';
            case 4: return 'bg-[var(--contrib-4)]';
            default: return 'bg-[var(--contrib-0)]';
        }
    }

    function getMonthLabels(data: any[]) {
        const labels: { index: number, label: string }[] = [];
        let currentMonth = -1;
        
        for (let i = 0; i < 53; i++) {
            const dayIndex = i * 7;
            if (dayIndex >= data.length) break;
            
            const dateStr = data[dayIndex].date;
            const date = new Date(dateStr);
            const month = date.getMonth();
            
            if (month !== currentMonth) {
                const monthName = date.toLocaleString('default', { month: 'short' });
                labels.push({ index: i, label: monthName });
                currentMonth = month;
            }
        }
        return labels;
    }

    $: monthLabels = contributions.length > 0 ? getMonthLabels(contributions) : [];
</script>

<NotionBlock>
    <div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
        <span class="text-xl">🟩</span>
        <h2 class="text-xl font-semibold text-[var(--notion-text)]">How Active I Am on GitHub</h2>
        <span class="ml-auto text-xs text-[#9b9a97]">{totalContributions} in {selectedYear}</span>
    </div>

    <div class="flex gap-2 overflow-x-auto pb-2 mb-2 text-sm">
        {#each years as year}
            <button 
                class="px-2 py-1 rounded transition-colors {selectedYear === year ? 'bg-[var(--notion-border)] text-[var(--notion-text)] font-medium' : 'text-[#9b9a97] hover:bg-[var(--notion-hover)]'}"
                on:click={() => selectedYear = year}
            >
                {year}
            </button>
        {/each}
    </div>

    {#if loading}
        <div class="h-32 flex items-center justify-center text-[#9b9a97] text-sm animate-pulse">
            Loading graph...
        </div>
    {:else if error}
        <div class="h-32 flex items-center justify-center text-red-500 text-sm">
            {error}
        </div>
    {:else}
        <div class="w-full overflow-x-auto custom-scrollbar pb-2">
            <!-- 
                Grid Rendering Logic:
                The API returns a flat array of days. We need to display them in columns of 7 (weeks).
                We can just iterate through the flat array and let CSS Grid or Flexbox wrap, but CSS Grid with flow-col is best for the standard github look (weeks as columns).
                However, to handle the exact "calendar" look where rows correspond to days of week (Sun-Sat), we verify the first day's weekday.
                The API typically returns full year data.
            -->
            <div class="flex relative h-5 mb-1 min-w-max">
                 <!-- Month Labels Layer -->
                {#each monthLabels as { index, label }}
                    <!-- 13px is approx width of col (10px) + gap (3px). We position absolutely relative to the start -->
                    <div 
                        class="absolute text-xs text-[#9b9a97]" 
                        style="left: {index * 13}px"
                    >
                        {label}
                    </div>
                {/each}
            </div>

            <div class="flex gap-[3px] min-w-max">
                {#each Array(53) as _, weekIndex}
                     <div class="flex flex-col gap-[3px]">
                        {#each Array(7) as _, dayIndex}
                            {@const dayData = contributions[weekIndex * 7 + dayIndex]}
                            {#if dayData}
                                <div 
                                    class="w-[10px] h-[10px] rounded-[2px] {getLevelColor(dayData.level)}" 
                                    title="{dayData.date}: {dayData.count} contributions"
                                ></div>
                            {/if}
                        {/each}
                     </div>
                {/each}
            </div>
            <div class="flex text-[10px] text-[#9b9a97] mt-2 justify-end items-center gap-1">
                <span>Less</span>
                <div class="w-[10px] h-[10px] rounded-[2px] bg-[var(--contrib-0)]"></div>
                <div class="w-[10px] h-[10px] rounded-[2px] bg-[var(--contrib-1)]"></div>
                <div class="w-[10px] h-[10px] rounded-[2px] bg-[var(--contrib-2)]"></div>
                <div class="w-[10px] h-[10px] rounded-[2px] bg-[var(--contrib-3)]"></div>
                <div class="w-[10px] h-[10px] rounded-[2px] bg-[var(--contrib-4)]"></div>
                <span>More</span>
            </div>
        </div>
    {/if}
</NotionBlock>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        height: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: var(--notion-border);
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: var(--notion-hover);
    }
</style>
