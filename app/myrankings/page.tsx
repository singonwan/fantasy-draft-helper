import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import React from 'react';

const MyOrder = () => {
	return (
		<>
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
		</>
	);
};

export default MyOrder;
