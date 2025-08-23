import Link from 'next/link';

export default function Header() {
	return (
		<header className="mx-auto bg-gradient-to-l to-pink-400 from-purple-400 text-white flex justify-between items-center p-6 mb-4">
			<div>
				<Link
					href={'/'}
					className="text-4xl font-bold hover:text-pink-200 hover:scale-105 transition-all duration-300"
				>
					ページタイトル
				</Link>
			</div>
			<nav>
				<ul className="flex gap-4 text-xl">
					<Link
						href={'/order'}
						className="hover:text-pink-200 hover:scale-105 transition-all duration-300"
					>
						Order
					</Link>
					<Link
						href={'/profile'}
						className="hover:text-pink-200 hover:scale-105 transition-all duration-300"
					>
						Profile
					</Link>
					<Link
						href={'/api'}
						className="hover:text-pink-200 hover:scale-105 transition-all duration-300"
					>
						API
					</Link>
					<Link
						href={'/calculator'}
						className="hover:text-pink-200 hover:scale-105 transition-all duration-300"
					>
						Calculator
					</Link>
				</ul>
			</nav>
		</header>
	);
}
