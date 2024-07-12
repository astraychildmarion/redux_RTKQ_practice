import { configureStore } from '@reduxjs/toolkit';
import { getTokenApi } from './service/tokenSlice.js';
import { getUserApi, userSlice } from './service/userSlice.js';
import { getAlbumApi, getShowApi, albumSlice } from './service/albumSlice.js';

export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[getTokenApi.reducerPath]: getTokenApi.reducer,
		[userSlice.name]: userSlice.reducer,
		[getUserApi.reducerPath]: getUserApi.reducer,
		[albumSlice.name]: albumSlice.reducer,
		[getAlbumApi.reducerPath]: getAlbumApi.reducer,
		[getShowApi.reducerPath]: getShowApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			getTokenApi.middleware,
			getUserApi.middleware,
			getAlbumApi.middleware,
			getShowApi.middleware
		),
});

export default store;
