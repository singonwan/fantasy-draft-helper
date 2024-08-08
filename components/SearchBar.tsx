'use client';
import React, { useState } from 'react';

const players = [
	{ id: 1, name: 'Tom Brady', position: 'QB', team: 'Bucs' },
	{ id: 2, name: 'Aaron Rodgers', position: 'QB', team: 'New York Jets' },
	{
		id: 3,
		name: 'Patrick Mahomes',
		position: 'QB',
		team: 'Kansas City Chiefs',
	},
	{ id: 4, name: 'Derrick Henry', position: 'RB', team: 'Baltimore Ravens' },
	{ id: 5, name: 'Devante Adams', position: 'WR', team: 'Las Vegas Raiders' },
	// Add more players as needed
];

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const [addedPlayers, setAddedPlayers] = useState([]);
	console.log(addedPlayers);

	const filteredPlayers = players.filter(
		(player) =>
			searchTerm.length > 0 &&
			player.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
			player.name.toLowerCase() !== searchTerm.toLowerCase()
	);

	const onAddPlayer = (player) => {
		setSearchTerm(player.name);
		console.log(player);
		setAddedPlayers((prevAddedPlayers) => {
			let updatedAddedPlayers = [...prevAddedPlayers];
			if (!prevAddedPlayers.includes(player)) {
				updatedAddedPlayers = [...prevAddedPlayers, player];
			} else {
				console.log('players been added already');
			}
			return updatedAddedPlayers;
		});
	};

	const onRemovePlayer = (player) => {
		const index = addedPlayers.indexOf(player);
		const updatedAddedPlayers = [...addedPlayers];
		if (index > -1) {
			updatedAddedPlayers.splice(index, 1);
			setAddedPlayers(updatedAddedPlayers);
		}
	};

	return (
		<div className="w-full flex flex-col items-center justify-center flex-wrap">
			<div className="w-96">
				<label>Player Search</label>
				<div className="flex items-center justify-center w-full flex-wrap">
					<input
						type="text"
						id="searchbar"
						name="searchbar"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search for a Player..."
						// required
					/>

					{/* <button
					// might not need this button
					className="bg-slate-600 rounded-xl"
					onClick={() => onAddPlayer(searchTerm)}
				>
					Add Player
				</button> */}
					<ul>
						{filteredPlayers.slice(0, 10).map((player) => (
							<li
								className="cursor-pointer w-96 border-gray-300 border bg-gray-50 p-2"
								key={player.id}
								onClick={() => onAddPlayer(player)}
							>
								{player.name}, {player.position}, {player.team}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="w-full p-24">
				<h1>Your Ranking</h1>
				{addedPlayers.map((player, index) => (
					<div
						className="width-full font-bold text-xl flex justify-between p-2 bg-slate-400 border border-blue-400"
						key={player.id}
						draggable={true}
					>
						<p>
							{player.name} {player.position}, {player.team}
						</p>
						<button onClick={() => onRemovePlayer(player)}>X</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
