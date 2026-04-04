import { env } from '$env/dynamic/private';

const nowPlayingAPI = "https://api.spotify.com/v1/me/player/currently-playing";
const topTracksAPI = "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term";
const tokenAPI = "https://accounts.spotify.com/api/token";

export const getAccessToken = async () => {
    const refreshToken = env.SPOTIFY_REFRESH_TOKEN;
    const basicAuth = btoa(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET);

    const response = await fetch(tokenAPI, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken as string,
        }).toString(),
    }).then((res) => res.json());

    if (!response.access_token) {
        console.error("[Spotify] Token exchange failed:", JSON.stringify(response));
        throw new Error("Failed to obtain Spotify access token");
    }

    return response.access_token as string;
};

export const getNowPlaying = async () => {
    const access_token = await getAccessToken();
    return fetch(nowPlayingAPI, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getTopTracks = async () => {
    const access_token = await getAccessToken();
    return fetch(topTracksAPI, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

