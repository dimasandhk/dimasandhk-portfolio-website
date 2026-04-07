import { json } from '@sveltejs/kit';
import { getTopTracks } from '$lib/server/spotify';

export async function GET({ setHeaders }) {
	setHeaders({
		'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
	});

	try {
		const response = await getTopTracks();
		console.log(response);
		const data = await response.json();

		if (!response.ok) {
			console.error('[Spotify] top-tracks API error:', JSON.stringify(data?.error));
			return json({ tracks: [] });
		}

		const { items } = data;

		const tracks = items.map((track: any) => ({
			artist: track.artists.map((_artist: any) => _artist.name).join(', '),
			songUrl: track.external_urls.spotify,
			title: track.name,
			albumImageUrl: track.album.images[0].url
		}));

		return json({ tracks });
	} catch (e) {
		console.error('[Spotify] top-tracks error:', e);
		return json({ tracks: [] });
	}
}
