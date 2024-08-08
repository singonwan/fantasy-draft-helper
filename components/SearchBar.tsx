'use client';
import React, { useState } from 'react';

const players = [
	'Tom Brady',
	'Aaron Rodgers',
	'Patrick Mahomes',
	'Derrick Henry',
	'Davante Adams',
	// Add more players as needed
];

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredPlayers = players.filter((player) =>
		player.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-96">
			<label>Player Search</label>
			<input
				type="search"
				id="searchbar"
				name="searchbar"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search for a Player..."
				required
			/>
			<ul>
				{searchTerm.length > 0 &&
					filteredPlayers.map((player, index) => <li key={index}>{player}</li>)}
			</ul>
		</div>
	);
};

export default SearchBar;
