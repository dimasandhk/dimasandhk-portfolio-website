import { json } from '@sveltejs/kit';
import { getNowPlaying } from '$lib/server/spotify';

export async function GET({ setHeaders }) {
	setHeaders({
		'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
	});

	try {
		const response = await getNowPlaying();

		if (response.status === 204 || response.status > 400) {
			return json({ isPlaying: false });
		}

		const song = await response.json();

		if (song.item === null) {
			return json({ isPlaying: false });
		}

		const isPlaying = song.is_playing;
		const title = song.item.name;
		const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
		const album = song.item.album.name;
		const albumImageUrl = song.item.album.images[0].url;
		const songUrl = song.item.external_urls.spotify;

		return json({
			album,
			albumImageUrl,
			artist,
			isPlaying,
			songUrl,
			title
		});
	} catch (e) {
		console.error('[Spotify] now-playing error:', e);
		return json({ isPlaying: false });
	}
}
