import { Provider, useSelector } from 'react-redux';
import { store } from './store.jsx';
import Sider from './component/Sider.jsx';
import { REDIRECT_URL } from './constant.js';
import { redirectToSpotifyAuthorize } from './utils.js';
import {
	useGetTokenMutation,
	useRefreshTokenMutation,
} from './service/tokenSlice.js';
import { useGetUserMutation } from './service/userSlice.js';
import AlbumList from './component/AlbumList.jsx';
// import EmojiRain from './component/EmojiRain.jsx';
import { useEffect } from 'react';

function App() {
	const [getToken] = useGetTokenMutation();
	const [refreshToken] = useRefreshTokenMutation();
	const [getUser] = useGetUserMutation();
	const accessToken = localStorage.getItem('access_token');

	const user = useSelector((state) => state.user);

	useEffect(() => {
		const args = new URLSearchParams(window.location.search);
		const code = args.get('code');
		const refreshTokenHandle = async () => {
			refreshToken()
				.unwrap()
				.then((action) => {
					console.log('refreshToken action', action);
					localStorage.setItem('access_token', action.access_token);
					localStorage.setItem('refresh_token', action.refresh_token);
				})
				.finally(() => {
					window.location.href = REDIRECT_URL;
				});
		};

		if (code) {
			const codeVerifier = localStorage.getItem('code_verifier');
			getToken({ code, codeVerifier })
				.unwrap()
				.then((action) => {
					localStorage.setItem('access_token', action.access_token);
					localStorage.setItem('refresh_token', action.refresh_token);
				})
				.then((token) => {
					localStorage.setItem('access_token', token.access_token);
				})
				.catch((error) => {
					console.log('getToken fail', error);
					if (error.status === 401) {
						refreshTokenHandle();
					}
				});

			const url = new URL(window.location.href);
			url.searchParams.delete('code');

			const updatedUrl = url.search
				? url.href
				: url.href.replace('?', '');
			window.history.replaceState({}, document.title, updatedUrl);
		}

		if (accessToken) {
			getUser()
				.unwrap()
				.catch((error) => {
					console.log('get user fail', error);
					if (error.status === 401) {
						// window.location.href = REDIRECT_URL;
						refreshTokenHandle();
					}
				})
				.then((action) => {
					console.log('getUser', action);
				});
		}
		return () => {
			console.log('clear');
		};
	}, [accessToken, refreshToken, getUser, getToken]);

	async function logout() {
		localStorage.clear();
		window.location.href = REDIRECT_URL;
	}

	return (
		<>
			<Provider store={store}>
				<div className="relative grid grid-cols-layout gap-0">
					{/* <EmojiRain /> */}
					<Sider
						display_name={user?.name}
						images={user?.images}
						onLogin={redirectToSpotifyAuthorize}
						onLogout={logout}
					></Sider>
					<div className="h-screen overflow-auto ">
						<h1>Fetch Spotify</h1>
						{user.name && <AlbumList user={user} />}
					</div>
				</div>
			</Provider>
		</>
	);
}

export default App;
