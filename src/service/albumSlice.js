import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { USER_DATA_ENDPOINT } from '../constant';

const initialState = {
	href: '123',
	items: [],
	total: 0,
};

export const albumSlice = createSlice({
	name: 'album',
	initialState,
	reducers: {
		getTotalAlbums(state) {
			return state.total || null;
		},
		getAlbumsList(state) {
			return state.items || null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			getAlbumApi.endpoints.getAlbum.matchFulfilled,
			(state, action) => {
				console.log('getAlbumApi', 'state', state, 'action', action);
				state.href = action.payload.href;
				state.total = action.payload.total;
				state.items = action.payload.items;
			}
		);
		builder.addMatcher(
			getShowApi.endpoints.getShow.matchFulfilled,
			(state, action) => {
				console.log('getShowApi', 'state', state, 'action', action);
				state.href = action.payload.href;
				state.total = action.payload.total;
				state.items = action.payload.items;
			}
		);
	},
});

export const getAlbumApi = createApi({
	reducerPath: 'getAlbumApi',
	baseQuery: fetchBaseQuery({ baseUrl: USER_DATA_ENDPOINT }),
	endpoints: (builder) => ({
		getAlbum: builder.query({
			query: (offset = 0) => ({
				method: 'GET',
				url: `albums?offset=${offset}&limit=20`,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						'access_token'
					)}`,
				},
			}),
		}),
	}),
});
export const getShowApi = createApi({
	reducerPath: 'getShowApi',
	baseQuery: fetchBaseQuery({ baseUrl: USER_DATA_ENDPOINT }),
	endpoints: (builder) => ({
		getShow: builder.query({
			query: (offset = 0) => ({
				method: 'GET',
				url: `shows?offset=${offset}&limit=20`,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						'access_token'
					)}`,
				},
			}),
		}),
	}),
});

export const { useGetAlbumQuery } = getAlbumApi;
export const { useGetShowQuery } = getShowApi;
export const { getTotalAlbums, getAlbumsList } = albumSlice.actions;
