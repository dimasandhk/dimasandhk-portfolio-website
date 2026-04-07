<script lang="ts">
	import { page } from '$app/stores';
	import House from 'lucide-svelte/icons/house';
	// import Trophy from 'lucide-svelte/icons/trophy';
	import Rocket from 'lucide-svelte/icons/rocket';
	import Link from 'lucide-svelte/icons/link';

	const links = [
		{ href: '/', icon: House, label: 'Home' },
		// { href: '/skills', icon: Wrench, label: 'Skills' },
		// { href: '/achievements', icon: Trophy, label: 'Achievements' },
		{ href: '/projects', icon: Rocket, label: 'Projects' },
		{ href: '/linktree', icon: Link, label: 'Linktree' }
	];
</script>

<nav
	class="fixed z-50 transition-all duration-300
    /* Mobile Styles: Bottom, Horizontal */
    bottom-6 left-1/2 -translate-x-1/2 flex-row
    /* Desktop Styles: Right, Vertical */
    md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:-translate-y-1/2 md:flex-col
    
    flex items-center gap-2 p-2 bg-[var(--notion-bg)]/80 backdrop-blur-md border border-[var(--notion-border)] rounded-full shadow-sm"
>
	{#each links as link}
		{@const isActive =
			$page.url.pathname === link.href ||
			($page.url.pathname === '/' && link.href === '/' && false)}
		<!-- Logic note: Simplified active check for now, specific logic might be needed if exact match desired -->

		<a
			href={link.href}
			class="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 group
            {$page.url.pathname === link.href
				? 'bg-[var(--notion-text)] text-[var(--notion-bg)]'
				: 'text-[#9b9a97] hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)]'}"
			aria-label={link.label}
		>
			<svelte:component this={link.icon} size={20} />

			<!-- Tooltip (Desktop only) -->
			<span
				class="absolute right-full mr-3 px-2 py-1 bg-[var(--notion-text)] text-[var(--notion-bg)] text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap hidden md:block"
			>
				{link.label}
			</span>
		</a>
	{/each}
</nav>
