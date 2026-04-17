<script lang="ts">
	import NotionPage from '$lib/components/NotionPage.svelte';
	import NotionBlock from '$lib/components/NotionBlock.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { pageSEO } from '$lib/config/seo';
	import House from 'lucide-svelte/icons/house';
	import Github from 'lucide-svelte/icons/github';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Mail from 'lucide-svelte/icons/mail';
	import Instagram from 'lucide-svelte/icons/instagram';
	import ExternalLink from 'lucide-svelte/icons/external-link';

	const links = [
		{
			label: 'Main Portfolio',
			url: '/',
			icon: House,
			desc: 'Back to my main website'
		},
		{
			label: 'LinkedIn',
			url: 'https://www.linkedin.com/in/dimasandhk/',
			icon: Linkedin,
			desc: 'Connect with me professionally'
		},
		{
			label: 'GitHub',
			url: 'https://github.com/dimasandhk',
			icon: Github,
			desc: 'Check out my open source work'
		},
		{
			label: 'Email',
			url: 'mailto:dimasandhikadiputra@gmail.com',
			icon: Mail,
			desc: 'Get in touch directly'
		},
		{
			label: 'Instagram',
			url: 'https://instagram.com/dimas.andhk',
			icon: Instagram,
			desc: 'Follow my daily updates'
		}
	];

	let videos = $state<any[]>([]);
	let nowPlaying = $state<any>(null);
	let topTracks = $state<any[]>([]);
	let isNowPlayingLoading = $state(true);
	let isTopTracksLoading = $state(true);

	import { onMount } from 'svelte';

	onMount(() => {
		// Fetch YouTube videos independently so it doesn't block Spotify data loading (or vice versa)
		fetch('/api/youtube/latest-videos')
			.then(async (res) => {
				if (res.ok) {
					const data = await res.json();
					videos = data.items;
				}
			})
			.catch((e) => console.error('Failed to fetch YouTube videos', e));

		// ⚡ Bolt: Fetch Spotify now-playing data independently to unblock rendering
		fetch('/api/spotify/now-playing')
			.then(async (res) => {
				if (res.ok) nowPlaying = await res.json();
			})
			.catch((e) => console.error('Failed to fetch Spotify now playing', e))
			.finally(() => {
				isNowPlayingLoading = false;
			});

		// ⚡ Bolt: Fetch Spotify top-tracks data independently to unblock rendering
		fetch('/api/spotify/top-tracks')
			.then(async (res) => {
				if (res.ok) {
					const data = await res.json();
					topTracks = data.tracks;
				}
			})
			.catch((e) => console.error('Failed to fetch Spotify top tracks', e))
			.finally(() => {
				isTopTracksLoading = false;
			});
	});
</script>

<MetaTags
	title={pageSEO.linktree.title}
	description={pageSEO.linktree.description}
	keywords={pageSEO.linktree.keywords}
	type={pageSEO.linktree.type}
/>

<NotionPage
	title="Links"
	icon="🔗"
	coverImage="/Banner_Linked_baru.png"
	mobileCoverImage="/Banner_Linked_mobile.png"
	domicile="Jakarta, Indonesia | GMT+7"
>
	<NotionBlock>
		<p class="text-[16px] leading-[1.5] mb-6">Everything you need to find me on the internet.</p>
	</NotionBlock>

	<div class="flex flex-col gap-3">
		{#each links as link}
			{@const Icon = link.icon}
			<NotionBlock>
				<a
					href={link.url}
					target={link.url.startsWith('/') ? '_self' : '_blank'}
					rel={link.url.startsWith('/') ? '' : 'noopener noreferrer'}
					class="flex items-center gap-4 p-3 rounded hover:bg-[var(--notion-hover)] border border-transparent hover:border-[var(--notion-border)] transition-all group"
				>
					<div
						class="flex items-center justify-center w-10 h-10 rounded bg-[var(--notion-bg)] border border-[var(--notion-border)] shadow-sm text-[var(--notion-text)]"
					>
						<Icon size={20} />
					</div>

					<div class="flex flex-col flex-1">
						<span
							class="font-medium text-[var(--notion-text)] group-hover:text-[var(--notion-text)]"
							>{link.label}</span
						>
						<span class="text-xs text-[#9b9a97]">{link.desc}</span>
					</div>

					<div class="text-[#9b9a97] opacity-0 group-hover:opacity-100 transition-opacity">
						<ExternalLink size={16} />
					</div>
				</a>
			</NotionBlock>
		{/each}
	</div>

	{#if videos.length > 0}
		<NotionBlock>
			<div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
				<span class="text-xl">📺</span>
				<h2 class="text-xl font-semibold text-[var(--notion-text)]">Latest Videos</h2>
			</div>
		</NotionBlock>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each videos as video}
				<NotionBlock>
					<div
						class="rounded-lg overflow-hidden border border-[var(--notion-border)] bg-[var(--notion-bg)]"
					>
						<div class="aspect-video w-full">
							<iframe
								width="100%"
								height="100%"
								src={`https://www.youtube.com/embed/${video.id.videoId}`}
								title={video.snippet.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						</div>
						<div class="p-3">
							<a
								href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-[var(--notion-text)] hover:underline line-clamp-2"
							>
								{video.snippet.title}
							</a>
							<div class="text-xs text-[#9b9a97] mt-1">
								{new Date(video.snippet.publishedAt).toLocaleDateString()}
							</div>
						</div>
					</div>
				</NotionBlock>
			{/each}
		</div>
	{/if}

	<!-- Spotify Activity -->
	<NotionBlock>
		<div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
			<span class="text-xl">🎵</span>
			<h2 class="text-xl font-semibold text-[var(--notion-text)]">Spotify Activity</h2>
		</div>

		<!-- Currently Playing — full-width row -->
		<div class="mb-6">
			<h3 class="text-xs font-semibold text-[#9b9a97] uppercase tracking-wider mb-3">
				Currently Playing
			</h3>
			{#if isNowPlayingLoading}
				<div class="text-[#9b9a97] animate-pulse text-sm">Loading now playing...</div>
			{:else if nowPlaying?.isPlaying}
				<a
					href={nowPlaying.songUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-4 p-4 rounded-xl border border-[var(--notion-border)] bg-[var(--notion-bg)] hover:bg-[var(--notion-hover)] transition-all group shadow-sm w-full"
				>
					<img
						src={nowPlaying.albumImageUrl}
						alt={nowPlaying.album}
						class="w-16 h-16 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0"
					/>
					<div class="flex flex-col flex-1 min-w-0">
						<span class="font-semibold text-[var(--notion-text)] truncate text-base"
							>{nowPlaying.title}</span
						>
						<span class="text-sm text-[#9b9a97] truncate">{nowPlaying.artist}</span>
						<span class="text-xs text-[#9b9a97] truncate mt-0.5">{nowPlaying.album}</span>
					</div>
					<div class="relative flex items-center justify-center w-10 h-10 shrink-0">
						<div class="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
						<div
							class="relative flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-500"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
								><path d="M8 5v14l11-7z" /></svg
							>
						</div>
					</div>
				</a>
			{:else}
				<div
					class="flex items-center gap-4 p-4 rounded-xl border border-[var(--notion-border)] bg-[var(--notion-gray)]/30 shadow-sm"
				>
					<div
						class="w-16 h-16 rounded-lg border border-[var(--notion-border)] bg-[var(--notion-bg)] flex items-center justify-center text-2xl opacity-40 shrink-0"
					>
						💤
					</div>
					<div class="flex flex-col">
						<span class="font-medium text-[var(--notion-text)]">Not Playing Anything</span>
						<span class="text-sm text-[#9b9a97]">Spotify is currently offline</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Top 10 Tracks — 2 columns of 5 -->
		<div>
			<h3 class="text-xs font-semibold text-[#9b9a97] uppercase tracking-wider mb-3">
				Top 10 Tracks
			</h3>
			{#if isTopTracksLoading}
				<div class="text-[#9b9a97] animate-pulse text-sm">Loading top tracks...</div>
			{:else if topTracks.length > 0}
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
					{#each topTracks as track, i}
						<a
							href={track.songUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--notion-hover)] transition-all group"
						>
							<span class="text-xs font-mono text-[#9b9a97] w-5 text-right shrink-0">{i + 1}</span>
							<div class="relative overflow-hidden rounded shrink-0">
								<img
									src={track.albumImageUrl}
									alt={track.title}
									class="w-9 h-9 object-cover group-hover:scale-110 transition-transform duration-300"
								/>
							</div>
							<div class="flex flex-col flex-1 min-w-0">
								<span class="text-sm font-medium text-[var(--notion-text)] truncate"
									>{track.title}</span
								>
								<span class="text-xs text-[#9b9a97] truncate">{track.artist}</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="text-sm text-[#9b9a97]">No top tracks found.</div>
			{/if}
		</div>
	</NotionBlock>

	<NotionBlock>
		<div
			class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[var(--notion-border)] pt-4 text-center"
		>
			© {new Date().getFullYear()} Dimas Andhika
		</div>
	</NotionBlock>
</NotionPage>
