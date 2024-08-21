import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import React from 'react';

const MyOrder = () => {
	return (
		<>
			<h1 className="font-bold text-3xl p-20 uppercase text-center">
				Fantasy Draft Helper
			</h1>
			<SearchBar />
		</>
	);
};

export default MyOrder;
