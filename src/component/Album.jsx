import PropTypes from 'prop-types';

const Album = ({ name, imageUrl = '', tracks = [], clickTrack = null }) => {
	const handleShowTrack = () => {
		if (clickTrack) {
			clickTrack(tracks.items);
		}
	};

	return (
		<div>
			<div key={name}>
				<h5>{name}</h5>
				<img className="w-36" src={imageUrl} />
				{tracks.total > 0 && (
					<button
						className="bg-slate-400 p-2 rounded-md"
						onClick={handleShowTrack}
					>
						Show track
					</button>
				)}
			</div>
		</div>
	);
};
Album.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	tracks: PropTypes.array,
	clickTrack: PropTypes.func,
};

export default Album;
