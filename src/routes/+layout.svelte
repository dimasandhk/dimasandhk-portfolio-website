<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import FloatingNav from '$lib/components/FloatingNav.svelte';
	import Contact from 'lucide-svelte/icons/contact';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	let { children } = $props();

	let isContactOpen = $state(false);
	let theme = $state<'dark' | 'light'>('dark');

	function toggleContact() {
		isContactOpen = !isContactOpen;
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			theme = storedTheme as 'dark' | 'light';
		} else {
			theme = 'dark';
			localStorage.setItem('theme', 'dark');
		}

		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	const routeConfig: Record<string, { icon: string; label: string }> = {
		linktree: { icon: '🔗', label: 'Links' },
		projects: { icon: '🚀', label: 'Projects' }
	};
</script>

<div class="min-h-screen w-full text-[var(--notion-text)] transition-colors duration-200">
	<!-- Main Content -->
	<main class="w-full relative">
		<!-- Minimal Topbar like public Notion -->
		<div
			class="sticky top-0 z-10 flex h-11 items-center justify-between px-3 bg-[var(--notion-bg)]/95 backdrop-blur-sm transition-all border-b border-[var(--notion-border)]"
		>
			<div class="flex items-center gap-1 text-sm text-[var(--notion-text)]">
				<a
					href="/"
					class="flex items-center gap-1 hover:bg-[var(--notion-hover)] px-2 py-1 rounded cursor-pointer transition-colors text-[var(--notion-text)] focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
				>
					<span class="text-base">👋</span>
					<span class="font-medium sm:hidden">Dimas' Portfolio</span>
					<span class="font-medium hidden sm:inline">Dimas Andhika's Portfolio</span>
				</a>

				{#if $page.url.pathname !== '/'}
					{#each $page.url.pathname.split('/').filter(Boolean) as segment, i}
						<span class="text-[#9b9a97] px-0.5">/</span>
						<div
							class="flex items-center gap-1 hover:bg-[var(--notion-hover)] px-2 py-1 rounded cursor-pointer transition-colors"
						>
							{#if routeConfig[segment]}
								<span class="text-base">{routeConfig[segment].icon}</span>
								<span class="font-medium">{routeConfig[segment].label}</span>
							{:else}
								<span class="text-base">📄</span>
								<span class="font-medium capitalize">{segment}</span>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
			<div class="flex items-center gap-2">
				<button
					onclick={toggleTheme}
					class="flex items-center justify-center h-7 w-7 rounded hover:bg-[var(--notion-hover)] transition-colors text-[var(--notion-text)] cursor-pointer focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
					aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
					title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
				>
					{#if theme === 'dark'}
						<Sun size={16} />
					{:else}
						<Moon size={16} />
					{/if}
				</button>
				<button
					onclick={toggleContact}
					class="flex items-center gap-1.5 text-sm cursor-pointer font-medium hover:bg-[var(--notion-hover)] px-2 py-1 rounded transition-colors text-[var(--notion-text)] focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
					aria-expanded={isContactOpen}
				>
					<Contact size={16} />
					<span>Contact</span>
				</button>
			</div>
		</div>

		{@render children()}

		<FloatingNav />

		<!-- Contact Modal -->
		{#if isContactOpen}
			<!-- Backdrop -->
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
				transition:fade={{ duration: 200 }}
				onclick={(e) => {
					if (e.target === e.currentTarget) isContactOpen = false;
				}}
				role="button"
				tabindex="0"
				onkeydown={(e) => e.key === 'Escape' && (isContactOpen = false)}
			>
				<!-- Modal Content -->
				<div
					class="w-full max-w-sm rounded-xl bg-[var(--notion-bg)] p-6 shadow-xl border border-[var(--notion-border)]"
					transition:fly={{ y: 20, duration: 300 }}
					role="dialog"
					aria-modal="true"
					tabindex="-1"
				>
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-semibold text-[var(--notion-text)]">Get in Touch</h3>
						<button
							onclick={() => (isContactOpen = false)}
							class="text-[#9b9a97] cursor-pointer hover:text-[var(--notion-text)] transition-colors p-1 rounded focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
							aria-label="Close contact modal"
							title="Close contact modal"
						>
							✕
						</button>
					</div>

					<p class="text-sm text-[var(--notion-text)] mb-6 leading-relaxed">
						Feel free to reach out for collaborations, opportunities, or just a friendly hello!
					</p>

					<div class="space-y-2">
						<a
							href="mailto:dimasandhikadiputra@gmail.com"
							class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--notion-gray)] transition-colors group focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
						>
							<span
								class="flex h-8 w-8 items-center justify-center rounded bg-[var(--notion-red-bg)] text-lg"
								>📧</span
							>
							<div class="flex flex-col">
								<span class="text-sm font-medium text-[var(--notion-text)]">Email</span>
								<span class="text-xs text-[#787774]">dimasandhikadiputra@gmail.com</span>
							</div>
						</a>

						<a
							href="https://www.linkedin.com/in/dimasandhk/"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--notion-gray)] transition-colors group focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
						>
							<span
								class="flex h-8 w-8 items-center justify-center rounded bg-[var(--notion-gray-bg)] text-lg"
								>💼</span
							>
							<div class="flex flex-col">
								<span class="text-sm font-medium text-[var(--notion-text)]">LinkedIn</span>
								<span class="text-xs text-[#787774]">Connect professionally</span>
							</div>
						</a>

						<a
							href="https://github.com/dimasandhk"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--notion-gray)] transition-colors group focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
						>
							<span
								class="flex h-8 w-8 items-center justify-center rounded bg-[var(--notion-blue-bg)] text-lg"
								>💻</span
							>
							<div class="flex flex-col">
								<span class="text-sm font-medium text-[var(--notion-text)]">GitHub</span>
								<span class="text-xs text-[#787774]">Check out my code</span>
							</div>
						</a>
						<a
							href="https://instagram.com/dimas.andhk"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--notion-gray)] transition-colors group focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
						>
							<span
								class="flex h-8 w-8 items-center justify-center rounded bg-[var(--notion-pink-bg)] text-lg"
								>📸</span
							>
							<div class="flex flex-col">
								<span class="text-sm font-medium text-[var(--notion-text)]">Instagram</span>
								<span class="text-xs text-[#787774]">Follow my daily updates</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>
