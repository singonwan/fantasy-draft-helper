import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import React from 'react';

const MyOrder = () => {
	return (
		<div className="bg-white min-h-screen">
			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div
					aria-hidden="true"
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					/>
				</div>
				<div className="px-24">
					<Link
						href="/"
						className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
					>
						Back
					</Link>
				</div>
				<h1 className="font-bold text-3xl p-8 uppercase text-center">
					Fantasy Draft Helper
				</h1>
				<SearchBar />
			</div>
		</div>
	);
};

export default MyOrder;
