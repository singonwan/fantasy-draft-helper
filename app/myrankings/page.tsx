'use client';

import SearchBar from '@/components/SearchBar';
import React from 'react';
import { useState } from 'react';
import { Player } from '@/types';

const MyOrder = () => {
	const [addedPlayers, setAddedPlayers] = useState<Player[]>([]);
	const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

	return (
		<>
			<h1 className="font-bold text-3xl p-20 uppercase text-center">
				Fantasy Draft Helper
			</h1>
			<SearchBar
				addedPlayers={addedPlayers}
				setAddedPlayers={setAddedPlayers}
				filteredPlayers={filteredPlayers}
				setFilteredPlayers={setFilteredPlayers}
			/>
		</>
	);
};

export default MyOrder;
