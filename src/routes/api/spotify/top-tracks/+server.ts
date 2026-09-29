import { json } from '@sveltejs/kit';
import { getTopTracks } from '$lib/server/spotify';

// Failures must not be cached at the CDN, or an empty list sticks around for a day
// after the underlying problem (e.g. an expired refresh token) is fixed.
const noStore = { 'Cache-Control': 'no-store' };

export async function GET({ setHeaders }) {
	try {
		const response = await getTopTracks();
		const data = await response.json();

		if (!response.ok) {
			console.error('[Spotify] top-tracks API error:', JSON.stringify(data?.error));
			return json({ tracks: [] }, { headers: noStore });
		}

		const { items } = data;

		const tracks = items.map((track: any) => ({
			artist: track.artists.map((_artist: any) => _artist.name).join(', '),
			songUrl: track.external_urls.spotify,
			title: track.name,
			albumImageUrl: track.album.images[0].url
		}));

		setHeaders({
			'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
		});
		return json({ tracks });
	} catch (e) {
		console.error('[Spotify] top-tracks error:', e);
		return json({ tracks: [] }, { headers: noStore });
	}
}
