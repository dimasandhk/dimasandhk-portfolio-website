<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import NotionBlock from './NotionBlock.svelte';
	import { indicator, prefersReducedMotion, reveal } from '$lib/motion';

	export let username = 'dimasandhk';

	let selectedYear = new Date().getFullYear();
	let years = Array.from({ length: 7 }, (_, i) => 2026 - i); // 2025, 2024, ..., 2020
	let loading = true;
	let error = '';

	let dataCache: Record<number, any> = {};
	let contributions: any[] = [];
	let totalContributions = 0;

	// The yearly total rolls between values instead of snapping.
	const displayedTotal = tweened(0, { duration: 700, easing: cubicOut });
	$: displayedTotal.set(totalContributions, prefersReducedMotion() ? { duration: 0 } : undefined);

	async function fetchData(year: number) {
		if (dataCache[year]) {
			contributions = dataCache[year].contributions;
			totalContributions = dataCache[year].total;
			return;
		}

		loading = true;
		error = '';
		try {
			const res = await fetch(
				`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
			);
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
			case 0:
				return 'bg-[var(--contrib-0)]';
			case 1:
				return 'bg-[var(--contrib-1)]';
			case 2:
				return 'bg-[var(--contrib-2)]';
			case 3:
				return 'bg-[var(--contrib-3)]';
			case 4:
				return 'bg-[var(--contrib-4)]';
			default:
				return 'bg-[var(--contrib-0)]';
		}
	}

	function getMonthLabels(data: any[]) {
		const labels: { index: number; label: string }[] = [];
		let currentMonth = -1;

		// ⚡ Bolt: Cache Intl.DateTimeFormat instance to avoid recreating it in loop
		const monthFormatter = new Intl.DateTimeFormat('default', { month: 'short' });

		for (let i = 0; i < 53; i++) {
			const dayIndex = i * 7;
			if (dayIndex >= data.length) break;

			const dateStr = data[dayIndex].date;
			const date = new Date(dateStr);
			const month = date.getMonth();

			if (month !== currentMonth) {
				const monthName = monthFormatter.format(date);
				labels.push({ index: i, label: monthName });
				currentMonth = month;
			}
		}
		return labels;
	}

	$: monthLabels = contributions.length > 0 ? getMonthLabels(contributions) : [];
</script>

<NotionBlock>
	<div class="section-rule flex items-center gap-2 pb-2 mb-4 mt-8" use:reveal>
		<span class="section-emoji text-xl">🟩</span>
		<h2 id="github" class="text-xl font-semibold text-[var(--notion-text)]">
			How Active I Am on GitHub <span class="text-sm text-[#9b9a97]"
				>(currently using GitLab on my internship)</span
			>
		</h2>
		<span class="ml-auto text-xs text-[#9b9a97] tabular-nums"
			>{Math.round($displayedTotal)} in {selectedYear}</span
		>
	</div>

	<div class="relative flex gap-2 overflow-x-auto pb-2 mb-2 text-sm" use:indicator>
		<span data-indicator class="rounded bg-[var(--notion-border)]" aria-hidden="true"></span>
		{#each years as year}
			<button
				class="indicator-item px-2 py-1 rounded transition active:scale-95 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)] {selectedYear ===
				year
					? 'bg-[var(--notion-border)] text-[var(--notion-text)] font-medium'
					: 'text-[#9b9a97] hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)]'}"
				on:click={() => (selectedYear = year)}
				aria-pressed={selectedYear === year}
			>
				{year}
			</button>
		{/each}
	</div>

	{#if loading}
		<!-- Skeleton in the exact shape of the graph -->
		<div class="w-full overflow-hidden pb-2" aria-busy="true" aria-label="Loading graph">
			<div class="h-5 mb-1"></div>
			<div class="graph-skeleton animate-pulse"></div>
		</div>
	{:else if error}
		<div class="h-32 flex items-center justify-center text-red-500 text-sm">
			{error}
		</div>
	{:else}
		{#key selectedYear}
			<div class="w-full overflow-x-auto custom-scrollbar pb-2" use:reveal={{ variant: 'fade' }}>
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
						<div class="absolute text-xs text-[#9b9a97]" style="left: {index * 13}px">
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
										class="cell w-[10px] h-[10px] rounded-[2px] {getLevelColor(dayData.level)}"
										style="--d: {weekIndex + dayIndex}"
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
		{/key}
	{/if}
</NotionBlock>

<style>
	.cell {
		transition: scale 120ms ease-out;
	}
	.cell:hover {
		scale: 1.35;
	}

	@media (prefers-reduced-motion: no-preference) {
		/* Cells sweep in diagonally, week by week, once the graph is revealed. */
		:global(.motion-ready [data-revealed]) .cell {
			animation: cell-in 380ms var(--ease-out) calc(var(--d) * 7ms) backwards;
		}
	}

	/* 53 × 7 grid of 10px cells with 3px gaps, drawn with two intersecting masks. */
	.graph-skeleton {
		width: 686px;
		height: 88px;
		background: var(--contrib-0);
		-webkit-mask:
			repeating-linear-gradient(90deg, #000 0 10px, transparent 10px 13px),
			repeating-linear-gradient(180deg, #000 0 10px, transparent 10px 13px);
		-webkit-mask-composite: source-in;
		mask:
			repeating-linear-gradient(90deg, #000 0 10px, transparent 10px 13px),
			repeating-linear-gradient(180deg, #000 0 10px, transparent 10px 13px);
		mask-composite: intersect;
	}

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
