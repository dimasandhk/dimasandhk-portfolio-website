import { json } from '@sveltejs/kit';
import { getLatestVideos } from '$lib/server/youtube';

export async function GET({ setHeaders }) {
	setHeaders({
		'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
	});

	try {
		const response = await getLatestVideos();
		const data = await response.json();

		if (!response.ok) {
			console.error('[YouTube] API error:', JSON.stringify(data?.error));
			return json({ items: [] });
		}

		return json({ items: data.items || [] });
	} catch (e) {
		console.error('[YouTube] error:', e);
		return json({ items: [] });
	}
}
