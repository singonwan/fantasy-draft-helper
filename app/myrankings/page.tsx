import SearchBar from '@/components/SearchBar';
import React from 'react';
import { verifySession } from '../_lib/session';
// import { useState } from 'react';
// import { Player } from '@/types';

const MyOrder = async () => {
	// const [addedPlayers, setAddedPlayers] = useState<Player[]>([]);
	// const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
	// move these guys back down, make this a server component, verify session on this page. conditional rendering.

	const session = await verifySession();

	return (
		<>
			<h1 className="font-bold text-3xl p-20 uppercase text-center">
				Fantasy Draft Helper
			</h1>
			<SearchBar
			// addedPlayers={addedPlayers}
			// setAddedPlayers={setAddedPlayers}
			// filteredPlayers={filteredPlayers}
			// setFilteredPlayers={setFilteredPlayers}
			/>

			{session && ( // to do: component for save button cus its client. server action. save rankings.
				<div className="w-11/12 px-24 flex items-end justify-end pt-4 pb-12">
					<button className="hidden select-none rounded-lg bg-gradient-to-tr from-purple-900 to-purple-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block">
						save
					</button>
				</div>
			)}
		</>
	);
};

export default MyOrder;
