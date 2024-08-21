import Link from 'next/link';

export default function Hero() {
	return (
		<div className="mx-auto max-w-xl py-32 sm:py-48 lg:py-56">
			<div className="text-center">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					Use Fantasy Draft Helper to set your{' '}
					<span className="text-indigo-700">own rankings</span>
				</h1>
				<p className="mt-6 text-lg leading-8 text-gray-600">
					set your rankings, with the ability to drag and drop to adjust with
					ease.
				</p>
				<p className="mt-6 text-lg leading-8 text-gray-600">
					Create an account to save these rankings.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						href="/myrankings"
						className="rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Your Rankings
					</Link>
					<Link
						href="/login"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Log in<span aria-hidden="true">→</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
