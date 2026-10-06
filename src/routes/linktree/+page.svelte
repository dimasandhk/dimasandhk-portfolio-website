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
	import type { YouTubeVideo, NowPlaying, SpotifyTrack } from '$lib/types';
	import { reveal } from '$lib/motion';

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

	let videos = $state<YouTubeVideo[]>([]);
	let nowPlaying = $state<NowPlaying | null>(null);
	let topTracks = $state<SpotifyTrack[]>([]);
	let isSpotifyLoading = $state(true);

	import { onMount } from 'svelte';

	onMount(async () => {
		// Fetch YouTube videos independently so it doesn't block Spotify data loading (or vice versa)
		fetch('/api/youtube/latest-videos')
			.then(async (res) => {
				if (res.ok) {
					const data = await res.json();
					videos = data.items;
				}
			})
			.catch((e) => console.error('Failed to fetch YouTube videos', e));

		// Fetch Spotify data together
		try {
			const [nowPlayingRes, topTracksRes] = await Promise.all([
				fetch('/api/spotify/now-playing'),
				fetch('/api/spotify/top-tracks')
			]);

			if (nowPlayingRes.ok) {
				nowPlaying = await nowPlayingRes.json();
			}
			if (topTracksRes.ok) {
				const data = await topTracksRes.json();
				topTracks = data.tracks;
			}
		} catch (e) {
			console.error('Failed to fetch Spotify data', e);
		} finally {
			isSpotifyLoading = false;
		}
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
		<p class="text-[16px] leading-[1.5] mb-6" use:reveal>Everything you need to find me on the internet.</p>
	</NotionBlock>

	<div class="flex flex-col gap-3">
		{#each links as link}
			{@const Icon = link.icon}
			<NotionBlock>
				<a
					href={link.url}
					target={link.url.startsWith('/') ? '_self' : '_blank'}
					rel={link.url.startsWith('/') ? '' : 'noopener noreferrer'}
					use:reveal
					class="flex items-center gap-4 p-3 rounded hover:bg-[var(--notion-hover)] border border-transparent hover:border-[var(--notion-border)] transition duration-200 active:scale-[0.99] group focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
				>
					<div
						class="flex items-center justify-center w-10 h-10 rounded bg-[var(--notion-bg)] border border-[var(--notion-border)] shadow-sm text-[var(--notion-text)] transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-md"
					>
						<Icon
							size={20}
							class="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6"
						/>
					</div>

					<div class="flex flex-col flex-1">
						<span
							class="font-medium text-[var(--notion-text)] group-hover:text-[var(--notion-text)]"
							>{link.label}</span
						>
						<span class="text-xs text-[#9b9a97]">{link.desc}</span>
					</div>

					<div
						class="text-[#9b9a97] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200"
					>
						<ExternalLink size={16} />
					</div>
				</a>
			</NotionBlock>
		{/each}
	</div>

	{#if videos.length > 0}
		<NotionBlock>
			<div class="section-rule flex items-center gap-2 pb-2 mb-4 mt-8" use:reveal>
				<span class="section-emoji text-xl">📺</span>
				<h2 class="text-xl font-semibold text-[var(--notion-text)]">Latest Videos</h2>
			</div>
		</NotionBlock>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each videos as video}
				<NotionBlock>
					<div
						class="rounded-lg overflow-hidden border border-[var(--notion-border)] bg-[var(--notion-bg)] transition duration-200 hover:shadow-md hover:-translate-y-0.5"
						use:reveal={{ variant: 'scale' }}
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
		<div class="section-rule flex items-center gap-2 pb-2 mb-4 mt-8" use:reveal>
			<span class="section-emoji text-xl">🎵</span>
			<h2 class="text-xl font-semibold text-[var(--notion-text)]">Spotify Activity</h2>
		</div>

		{#if isSpotifyLoading}
			<!-- Skeleton shaped like the loaded content -->
			<div class="animate-pulse" aria-busy="true" aria-label="Loading Spotify stats">
				<div class="h-3 w-28 rounded bg-[var(--notion-gray-bg)] mb-3"></div>
				<div
					class="flex items-center gap-4 p-4 rounded-xl border border-[var(--notion-border)] mb-6"
				>
					<div class="w-16 h-16 rounded-lg bg-[var(--notion-gray-bg)] shrink-0"></div>
					<div class="flex flex-col gap-2 flex-1">
						<div class="h-3.5 w-1/2 rounded bg-[var(--notion-gray-bg)]"></div>
						<div class="h-3 w-1/3 rounded bg-[var(--notion-gray-bg)]"></div>
					</div>
				</div>
				<div class="h-3 w-24 rounded bg-[var(--notion-gray-bg)] mb-3"></div>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
					{#each Array(6) as _}
						<div class="flex items-center gap-3 p-2">
							<div class="w-5 shrink-0"></div>
							<div class="w-9 h-9 rounded bg-[var(--notion-gray-bg)] shrink-0"></div>
							<div class="flex flex-col gap-1.5 flex-1">
								<div class="h-3 w-3/4 rounded bg-[var(--notion-gray-bg)]"></div>
								<div class="h-2.5 w-1/2 rounded bg-[var(--notion-gray-bg)]"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<!-- Currently Playing — full-width row -->
			<div class="mb-6" use:reveal>
				<h3 class="text-xs font-semibold text-[#9b9a97] uppercase tracking-wider mb-3">
					Currently Playing
				</h3>
				{#if nowPlaying?.isPlaying}
					<a
						href={nowPlaying.songUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-4 p-4 rounded-xl border border-[var(--notion-border)] bg-[var(--notion-bg)] hover:bg-[var(--notion-hover)] hover:shadow-md active:scale-[0.99] transition duration-200 group shadow-sm w-full"
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
						<!-- Equalizer: three bars bouncing on transform only -->
						<div
							class="flex items-end justify-center gap-[3px] w-10 h-10 shrink-0 rounded-full bg-green-500/10 pb-3"
							role="img"
							aria-label="Now playing"
						>
							<span class="eq-bar" style="--eq-delay: 0ms"></span>
							<span class="eq-bar" style="--eq-delay: -400ms"></span>
							<span class="eq-bar" style="--eq-delay: -200ms"></span>
						</div>
					</a>
				{:else}
					<div
						class="flex items-center gap-4 p-4 rounded-xl border border-[var(--notion-border)] bg-[var(--notion-gray)]/30 shadow-sm"
					>
						<div
							class="w-16 h-16 rounded-lg border border-[var(--notion-border)] bg-[var(--notion-bg)] flex items-center justify-center text-2xl opacity-40 shrink-0"
						>
							<span class="snooze">💤</span>
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
				<h3 class="text-xs font-semibold text-[#9b9a97] uppercase tracking-wider mb-3" use:reveal>
					Top 10 Tracks
				</h3>
				{#if topTracks.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
						{#each topTracks as track, i}
							<a
								href={track.songUrl}
								target="_blank"
								rel="noopener noreferrer"
								use:reveal
								class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--notion-hover)] transition-colors group focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--notion-bg)]"
							>
								<span class="text-xs font-mono text-[#9b9a97] w-5 text-right shrink-0">{i + 1}</span
								>
								<div class="relative overflow-hidden rounded shrink-0">
									<img
										src={track.albumImageUrl}
										alt={track.title}
										class="w-9 h-9 object-cover group-hover:scale-110 transition-transform duration-300"
									/>
								</div>
								<div
									class="flex flex-col flex-1 min-w-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
								>
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
		{/if}
	</NotionBlock>

	<NotionBlock>
		<div
			class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[var(--notion-border)] pt-4 text-center"
			use:reveal={{ variant: 'fade' }}
		>
			© {new Date().getFullYear()} Dimas Andhika
		</div>
	</NotionBlock>
</NotionPage>

<style>
	.eq-bar {
		width: 3px;
		height: 14px;
		border-radius: 1px;
		background: rgb(34 197 94);
		transform-origin: bottom;
		transform: scaleY(0.5);
	}

	@media (prefers-reduced-motion: no-preference) {
		.eq-bar {
			animation: equalizer 900ms ease-in-out var(--eq-delay) infinite;
		}
		.snooze {
			display: inline-block;
			animation: snooze 2.4s ease-in-out infinite;
		}
	}

	@keyframes snooze {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
		}
		50% {
			transform: translate3d(0, -3px, 0);
		}
	}
</style>
