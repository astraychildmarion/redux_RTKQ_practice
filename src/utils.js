import { AUTH_ENDPOINT, SCOPE, REDIRECT_URL } from './constant';
async function redirectToSpotifyAuthorize() {
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const randomValues = await crypto.getRandomValues(new Uint8Array(64));
	const randomString = randomValues.reduce(
		(acc, x) => acc + possible[x % possible.length],
		''
	);

	const code_verifier = randomString;
	const data = new TextEncoder().encode(code_verifier);
	const hashed = await crypto.subtle.digest('SHA-256', data);

	const code_challenge_base64 = btoa(
		String.fromCharCode(...new Uint8Array(hashed))
	)
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');

	window.localStorage.setItem('code_verifier', code_verifier);

	const authUrl = new URL(AUTH_ENDPOINT);
	const params = {
		response_type: 'code',
		client_id: import.meta.env.VITE_CLIENT_ID,
		scope: SCOPE,
		code_challenge_method: 'S256',
		code_challenge: code_challenge_base64,
		redirect_uri: REDIRECT_URL,
	};

	authUrl.search = new URLSearchParams(params).toString();
	window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

export { redirectToSpotifyAuthorize };
