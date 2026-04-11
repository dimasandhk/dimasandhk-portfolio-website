import { env } from '$env/dynamic/private';

export const getLatestVideos = async () => {
	const apiKey = env.YOUTUBE_API_KEY;
	const channelId = env.YOUTUBE_CHANNEL_ID;
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=2&order=date&type=video&key=${apiKey}`;

	return fetch(url);
};
