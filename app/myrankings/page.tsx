import SearchBar from '@/components/SearchBar';
import React from 'react';

const MyOrder = () => {
	return (
		<main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-slate-300 to-slate-700">
			<h1 className="font-bold text-3xl p-8 uppercase">Fantasy Draft Helper</h1>
			<SearchBar />
		</main>
	);
};

export default MyOrder;
