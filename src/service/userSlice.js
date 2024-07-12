import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_DATA_ENDPOINT } from '../constant';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: null,
	images: null,
	name: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserId(state) {
			return state.id || null;
		},
		getUserImages(state) {
			return state.images || null;
		},
		getUserName(state) {
			return state.name || null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			getUserApi.endpoints.getUser.matchFulfilled,
			(state, action) => {
				state.id = action.payload.id;
				state.images = action.payload.images;
				state.name = action.payload.display_name;
				localStorage.setItem('user_id', action.payload.id);
				localStorage.setItem('user_name', action.payload.display_name);
				localStorage.setItem(
					'user_images',
					JSON.stringify(action.payload.images)
				);
			}
		);
	},
});

export const getUserApi = createApi({
	reducerPath: 'getUserApi',
	baseQuery: fetchBaseQuery({ baseUrl: USER_DATA_ENDPOINT }),
	endpoints: (builder) => ({
		getUser: builder.mutation({
			query: () => ({
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						'access_token'
					)}`,
				},
			}),
		}),
	}),
});

export const { useGetUserMutation } = getUserApi;

export const { getUserId, getUserImages, getUserName } = userSlice.actions;
