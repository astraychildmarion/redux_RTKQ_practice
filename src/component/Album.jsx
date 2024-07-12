import React from 'react';
import { useState } from 'react';

const Album = ({ name, imageUrl = '', tracks = [] }) => {
	const [showTrack, setShowTrack] = useState(false);
	const handleShowTrack = () => {
		setShowTrack((prev) => !prev);
	};

	const tracksGenerator = (tracks) => {
		tracks.items.map((track) => <li key={track.name}>{track.name}</li>);
	};

	return (
		<div>
			<div key={name}>
				<h5>{name}</h5>
				<img className="rounded-full" src={imageUrl} />
				<button
					className="bg-slate-400 p-2 rounded-md"
					onClick={handleShowTrack}
				>
					Show track
				</button>
				<ol className={showTrack ? '' : 'hidden'}>
					{tracks.length > 0 ? tracksGenerator(tracks) : 'No tracks'}
				</ol>
			</div>
		</div>
	);
};

export default Album;
