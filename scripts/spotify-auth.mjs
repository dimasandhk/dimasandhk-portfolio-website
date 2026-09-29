// Mints a new SPOTIFY_REFRESH_TOKEN and writes it into .env.
//
// Spotify refresh tokens expire 6 months after authorization (and can be revoked),
// after which the token endpoint returns `invalid_grant`. Re-run this when that happens.
//
// Usage: node scripts/spotify-auth.mjs [redirectUri]
//   The redirect URI (default http://127.0.0.1:3000/callback) must be registered in the
//   app's settings on https://developer.spotify.com/dashboard. Spotify rejects `localhost`.

import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const ENV_PATH = new URL('../.env', import.meta.url);
const SCOPES = 'user-read-currently-playing user-top-read';
const redirectUri = new URL(process.argv[2] ?? 'http://127.0.0.1:3000/callback');

const envText = readFileSync(ENV_PATH, 'utf8');
const readEnv = (key) =>
	envText
		.match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1]
		.trim()
		.replace(/^"|"$/g, '');

const clientId = readEnv('SPOTIFY_CLIENT_ID');
const clientSecret = readEnv('SPOTIFY_CLIENT_SECRET');
if (!clientId || !clientSecret) {
	console.error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env');
	process.exit(1);
}

const state = randomBytes(16).toString('hex');
const authorizeUrl =
	'https://accounts.spotify.com/authorize?' +
	new URLSearchParams({
		response_type: 'code',
		client_id: clientId,
		scope: SCOPES,
		redirect_uri: redirectUri.href,
		state,
		show_dialog: 'true'
	});

const server = createServer(async (req, res) => {
	const url = new URL(req.url, redirectUri);
	if (url.pathname !== redirectUri.pathname) {
		res.writeHead(404).end();
		return;
	}

	const finish = (status, message) => {
		res.writeHead(status, { 'Content-Type': 'text/plain' }).end(message);
		console.log(message);
		server.close();
		process.exitCode = status === 200 ? 0 : 1;
	};

	if (url.searchParams.get('state') !== state) return finish(400, 'State mismatch, aborting.');
	const code = url.searchParams.get('code');
	if (!code) return finish(400, `Authorization failed: ${url.searchParams.get('error')}`);

	const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: redirectUri.href
		})
	});
	const token = await tokenRes.json();
	if (!token.refresh_token) return finish(500, `Token exchange failed: ${JSON.stringify(token)}`);

	const line = `SPOTIFY_REFRESH_TOKEN="${token.refresh_token}"`;
	const updated = /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(envText)
		? envText.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
		: `${envText.trimEnd()}\n${line}\n`;
	writeFileSync(ENV_PATH, updated);

	finish(
		200,
		`New SPOTIFY_REFRESH_TOKEN written to .env (scopes: ${token.scope}).\n` +
			'Remember to update it in the Vercel project environment variables too.'
	);
});

server.listen(Number(redirectUri.port) || 80, redirectUri.hostname, () => {
	console.log(`Open this URL and approve access:\n\n${authorizeUrl}\n`);
});
