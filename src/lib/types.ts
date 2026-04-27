export interface SpotifyTrack {
	artist: string;
	songUrl: string;
	title: string;
	albumImageUrl: string;
}

export interface NowPlaying {
	album?: string;
	albumImageUrl?: string;
	artist?: string;
	isPlaying: boolean;
	songUrl?: string;
	title?: string;
}

export interface YouTubeVideo {
	id: {
		videoId: string;
	};
	snippet: {
		title: string;
		publishedAt: string;
		thumbnails?: {
			default: { url: string };
			medium: { url: string };
			high: { url: string };
		};
	};
}
