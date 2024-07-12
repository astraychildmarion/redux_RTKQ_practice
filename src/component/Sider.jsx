import PropTypes from 'prop-types';

const Sider = ({
	display_name = null,
	images = null,
	onLogin = null,
	onLogout = null,
}) => {
	const siderData = [
		{
			page: 'Home',
			href: '/',
		},
		{
			page: 'About',
			href: '/about',
		},
		{
			page: 'Contact',
			href: '/contact',
		},
	];

	return (
		<nav className="h-screen w-40 py-4 bg-amber-600 flex flex-col justify-between">
			<div>
				{display_name === null ? (
					<button onClick={onLogin}>Login</button>
				) : (
					<div>
						Hi {display_name}
						<img
							src={images[0]?.url}
							alt="user photo"
							className="rounded-full"
						/>
					</div>
				)}

				{siderData.map((item) => {
					return (
						<a href={item.href} key={item.href}>
							<div className="mx-2 py-1 px-2 rounded-md hover:bg-slate-500 hover:cursor-pointer">
								{item.page}
							</div>
						</a>
					);
				})}
			</div>
			{display_name !== null && (
				<button
					onClick={onLogout}
					className="mx-2 py-1 px-2 rounded-md hover:bg-slate-500 hover:cursor-pointer"
				>
					Logout
				</button>
			)}
		</nav>
	);
};

Sider.propTypes = {
	display_name: PropTypes.string,
	images: PropTypes.array,
	onLogin: PropTypes.func.isRequired,
	onLogout: PropTypes.func,
};

export default Sider;
