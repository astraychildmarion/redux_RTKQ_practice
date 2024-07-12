import { useEffect } from 'react';
import { useGetAlbumQuery, useGetShowQuery } from '../service/albumSlice';
import Album from './Album';

const AlbumList = () => {
	const { data: songAlbum, isLoading: isLoadingAlbum } = useGetAlbumQuery();
	const { data: showAlbum, isLoading: isLoadingShow } = useGetShowQuery();
	useEffect(() => {
		console.log('AlbumList useEffect');
		return () => {};
	}, []);

	return (
		<div>
			AlbumList
			{isLoadingAlbum && isLoadingShow ? (
				<p>Loading</p>
			) : (
				<div className="grid grid-cols-3 gap-2">
					{songAlbum.length > 0 && <h5>Favorite album</h5>}
					{songAlbum?.items?.map((album) => (
						<Album
							key={album.album.name}
							name={album.album.name}
							imageUrl={album.album.images[0].url}
						/>
					))}
					{showAlbum.length > 0 && <h5>Favorite Podcast</h5>}
					{showAlbum?.items?.map((show) => (
						<Album
							key={show.show.name}
							name={show.show.name}
							imageUrl={show.show.images[0].url}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default AlbumList;
