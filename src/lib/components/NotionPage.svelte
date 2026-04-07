<script lang="ts">
	import Globe from 'lucide-svelte/icons/globe';
	interface Props {
		title: string;
		icon?: string;
		coverImage?: string;
		mobileCoverImage?: string;
		domicile?: string;
		children?: import('svelte').Snippet;
	}

	let { title, icon = '📄', coverImage, mobileCoverImage, domicile, children }: Props = $props();

	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<div class="relative w-full flex flex-col min-h-full pb-32">
	<!-- Cover Image -->
	<div class="relative h-[30vh] w-full overflow-hidden">
		<div
			class="absolute w-full bg-cover bg-center will-change-transform cover-bg"
			style="
                height: 200%;
                top: -50%;
                --bg-desktop: {coverImage
				? `url(${coverImage})`
				: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)'};
                --bg-mobile: {mobileCoverImage
				? `url(${mobileCoverImage})`
				: coverImage
					? `url(${coverImage})`
					: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)'};
                transform: translate3d(0, {scrollY * 0.5}px, 0);
            "
		></div>
	</div>

	<div class="mx-auto w-full max-w-[900px] px-4 md:px-12 relative">
		<!-- Icon -->
		<div
			class="absolute -top-[3.5rem] left-4 md:left-12 flex h-[78px] w-[78px] items-center justify-center text-[78px] select-none"
		>
			{icon}
		</div>

		<!-- Title & Meta -->
		<div class="pt-12 pb-8 group">
			<h1 class="text-4xl font-bold text-[var(--notion-text)]">{title}</h1>
			{#if domicile}
				<div class="flex items-center gap-2 mt-2 text-[#9b9a97] text-[15px]">
					<Globe size={16} />
					<span>{domicile}</span>
				</div>
			{/if}
		</div>

		<div class="h-[1px] w-full bg-[var(--notion-border)] mb-8"></div>

		<!-- Page Content -->
		<div class="notion-content">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.cover-bg {
		background-image: var(--bg-desktop);
	}

	@media (max-width: 768px) {
		.cover-bg {
			background-image: var(--bg-mobile);
		}
	}

	:global(.notion-content > *) {
		margin-bottom: 0.5rem;
	}
</style>
