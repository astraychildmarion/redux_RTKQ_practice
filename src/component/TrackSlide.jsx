import PropTypes from 'prop-types';

const LyricSlide = ({ tracks, showTracks, clickClose }) => {
	const classStyle = showTracks ? 'w-1/2 p-4 ' : 'w-0';

	return (
		<div
			className={
				`trackList h-screen fixed top-0 right-0 bg-emerald-600 overflow-x-auto transition-all ` +
				`${classStyle}`
			}
		>
			<div
				className={
					(showTracks ? 'w-6 h-6' : 'w-0') +
					` text-center rounded-full text-yellow-50 font-bold bg-amber-400`
				}
				onClick={clickClose}
			>
				Ｘ
			</div>
			{tracks.map((item) => (
				<div key={item.name} className="m-2">
					{item.name}
				</div>
			))}
		</div>
	);
};

LyricSlide.propTypes = {
	showTracks: PropTypes.boolean,
	tracks: PropTypes.array,
	clickClose: PropTypes.func,
};

export default LyricSlide;
