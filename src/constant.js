export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID; // your CLIENT_ID
export const REDIRECT_URL = import.meta.env.VITE_URL; // your redirect URL - must be localhost URL and/or HTTPS

export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const USER_DATA_ENDPOINT = 'https://api.spotify.com/v1/me';
export const SCOPE = 'user-read-private user-read-email user-library-read';
