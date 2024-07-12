import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN_ENDPOINT, REDIRECT_URL } from '../constant';

export const getTokenApi = createApi({
	reducerPath: 'getTokenApi',
	baseQuery: fetchBaseQuery({ baseUrl: TOKEN_ENDPOINT }),
	endpoints: (builder) => ({
		getToken: builder.mutation({
			query: ({ code, codeVerifier }) => ({
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					client_id: import.meta.env.VITE_CLIENT_ID,
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: REDIRECT_URL,
					code_verifier: codeVerifier,
				}),
			}),
		}),
		refreshToken: builder.mutation({
			query: () => ({
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					client_id: import.meta.env.VITE_CLIENT_ID,
					grant_type: 'refresh_token',
					refresh_token: localStorage.getItem('refresh_token'),
				}),
			}),
		}),
	}),
});

export const { useGetTokenMutation, useRefreshTokenMutation } = getTokenApi;
