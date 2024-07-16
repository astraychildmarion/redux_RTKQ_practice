import { useEffect, useRef } from 'react';
const EmojiRain = () => {
	const EmojiContainerRef = useRef(null);
	const rainCircle = useRef([]);
	const emojis = ['🥹', '🩷'];
	const intervalTime = 1000;
	const frameIntercval = 1000 / 60;

	let lastFrameTime = 0;
	let emojiGenerator;

	const getRandom = (min, max) => Math.random() * (max - min) + min;

	class Circle {
		constructor(x, y, emoji, velocity, range) {
			this.x = x;
			this.y = y;
			this.emoji = emoji;
			this.velocity = velocity;
			this.range = range;
			this.element = document.createElement('span');
			this.setStyle();
			this.element.innerHTML = emoji;
			EmojiContainerRef.current.appendChild(this.element);
			this.element.addEventListener('click', () => {
				console.log('hahaha');
				this.remove();
			});
		}
		update() {
			this.y += this.velocity.y;
			this.x += this.velocity.x;

			if (this.y > window.innerHeight) {
				this.remove();
			} else {
				this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
			}
		}

		setStyle() {
			this.element.style.opacity = 1;
			this.element.style.position = 'absolute';
			this.element.style.fontSize = '40px';
			this.element.style.color = `hsl(${Math.floor(
				Math.random() * 360
			)}, 80%, 50%)`;
		}

		remove() {
			const index = rainCircle.current.indexOf(this);
			if (index !== -1) {
				rainCircle.current.splice(index, 1);
				EmojiContainerRef.current.removeChild(this.element);
			}
		}
	}

	const generateEmoji = () => {
		addRainCircle(
			100,
			window.innerWidth - 100,
			emojis[Math.floor(Math.random() * emojis.length)]
		);
	};

	const startGenerating = () => {
		emojiGenerator = setInterval(generateEmoji, intervalTime);
	};

	const stopGenerating = () => {
		clearInterval(emojiGenerator);
	};

	const addRainCircle = (xRangeStart, xRangeEnd, emoji) => {
		const c = new Circle(
			getRandom(xRangeStart, xRangeEnd),
			getRandom(-80, -30),
			emoji,
			{ x: getRandom(-0.15, 0.15), y: getRandom(1.5, 3) },
			[xRangeStart, xRangeEnd]
		);
		rainCircle.current.push(c);
	};

	const animate = (time) => {
		const deltaTime = time - lastFrameTime;
		if (deltaTime >= frameIntercval) {
			rainCircle.current.forEach((circle) => circle.update());
			lastFrameTime = time;
		}
		requestAnimationFrame(animate);
	};

	useEffect(() => {
		startGenerating();
		requestAnimationFrame(animate);

		const handleVisibilityChange = () => {
			document.hidden ? stopGenerating() : startGenerating();
		};
		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			stopGenerating();
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
		};
	}, []);

	return (
		<div
			id="emojiRain"
			className="fixed right-0 top-0  w-full h-screen overflow-hidden"
			ref={EmojiContainerRef}
		></div>
	);
};

export default EmojiRain;
