<script lang="ts">
	import { page } from '$app/stores';
	import { indicator } from '$lib/motion';
	import House from 'lucide-svelte/icons/house';
	import Rocket from 'lucide-svelte/icons/rocket';
	import Link from 'lucide-svelte/icons/link';

	const links = [
		{ href: '/', icon: House, label: 'Home' },
		{ href: '/projects', icon: Rocket, label: 'Projects' },
		{ href: '/linktree', icon: Link, label: 'Linktree' }
	];
</script>

<nav
	use:indicator={{ selector: '[aria-current="page"]' }}
	class="floating-nav enter-dock fixed z-50
    /* Mobile Styles: Bottom, Horizontal */
    bottom-6 left-1/2 -translate-x-1/2 flex-row
    /* Desktop Styles: Right, Vertical */
    md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:-translate-y-1/2 md:flex-col

    flex items-center gap-2 p-2 bg-[var(--notion-bg)]/80 backdrop-blur-md border border-[var(--notion-border)] rounded-full shadow-sm"
>
	<!-- Active pill: glides to the current route -->
	<span data-indicator class="rounded-full bg-[var(--notion-text)]" aria-hidden="true"></span>

	{#each links as link}
		{@const isActive = $page.url.pathname === link.href}
		<a
			href={link.href}
			class="indicator-item flex items-center justify-center w-10 h-10 rounded-full transition duration-200 group active:scale-90 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]
            {isActive
				? 'bg-[var(--notion-text)] text-[var(--notion-bg)]'
				: 'text-[#9b9a97] hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)]'}"
			aria-label={link.label}
			aria-current={isActive ? 'page' : undefined}
		>
			<link.icon
				size={20}
				class="transition-transform duration-300 ease-out group-hover:scale-110 {isActive
					? ''
					: 'group-hover:-rotate-6'}"
			/>

			<!-- Tooltip (Desktop only) -->
			<span
				class="absolute right-full mr-3 px-2 py-1 bg-[var(--notion-text)] text-[var(--notion-bg)] text-xs rounded opacity-0 invisible translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible transition duration-200 whitespace-nowrap hidden md:block pointer-events-none"
			>
				{link.label}
			</span>
		</a>
	{/each}
</nav>

<style>
	.floating-nav {
		view-transition-name: floating-nav;
	}
</style>
