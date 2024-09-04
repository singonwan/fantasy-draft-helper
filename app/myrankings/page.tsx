import SearchBar from '@/components/SearchBar';
import React from 'react';
import { getAllPlayers, getSavedRankings } from './actions';
import { verifySession } from '../_lib/session';
import { Player } from '@/types';

const MyOrder = async () => {
	// keeping this a server component to have static data fetching.
	// instead of using fetch in useEffect
	const allPlayers = await getAllPlayers();

	// pass session down to child client component for app state with context
	const session = await verifySession();

	// get players from user rankings
	let savedRankings: Player[] = [];
	if (session) {
		const data = await getSavedRankings(session.userId);
		savedRankings = data;
	}

	return (
		<>
			<h1 className="font-bold text-3xl p-20 uppercase text-center">
				Fantasy Draft Helper
			</h1>
			<SearchBar
				allPlayers={allPlayers}
				session={session}
				savedRankings={savedRankings}
			/>
		</>
	);
};

export default MyOrder;
