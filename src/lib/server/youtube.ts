import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

export const getLatestVideos = async () => {
	const apiKey = env.YOUTUBE_API_KEY;
	const channelId = env.YOUTUBE_CHANNEL_ID;

	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=2&order=date&type=video&key=${apiKey}`;
	const referer = dev ? 'http://localhost:5173' : 'https://dimasandhika.vercel.app/';

	return fetch(url, {
		headers: {
			Referer: referer
		}
	});
};
