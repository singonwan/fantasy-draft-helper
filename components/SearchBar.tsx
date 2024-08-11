'use client';
import React, { useCallback, useState } from 'react';
import PlayerTable from './PlayerTable';
import { PLAYERS } from '@/data/players';
import { Player } from '@/types';

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const [addedPlayers, setAddedPlayers] = useState([]);
	console.log(addedPlayers);

	const filteredPlayers = PLAYERS.filter(
		(player) =>
			searchTerm.length > 0 &&
			player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			player.name.toLowerCase() !== searchTerm.toLowerCase()
	);

	const onAddPlayer = (player: Player) => {
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

	const onRemovePlayer = useCallback(
		(id: string) => {
			console.log(id);
			const updatedAddedPlayers = addedPlayers.filter(
				(player) => player.id !== id
			);
			setAddedPlayers(updatedAddedPlayers);
		},
		[addedPlayers]
	);

	return (
		<div className="w-full flex flex-col items-center justify-center flex-wrap">
			<div className="w-96 ">
				<label className="font-bold py-4 text-lg">Player Search</label>
				<div className="flex items-center justify-center w-full flex-wrap relative">
					<input
						type="text"
						id="searchbar"
						name="searchbar"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="block w-96 p-4 my-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
						placeholder="Search for a Player..."
						// required
					/>
					<ul>
						{filteredPlayers.slice(0, 10).map((player) => (
							<li
								className="cursor-pointer py-1 w-96 border-gray-300 border bg-gray-50 hover:bg-yellow-50 hover:text-gray-900 rounded-md text-center"
								key={player.id}
								onClick={() => onAddPlayer(player)}
							>
								{player.name}, {player.position}, {player.team}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="w-full px-24 pt-4">
				<h1 className="text-2xl font-bold">Your Rankings</h1>
			</div>

			<PlayerTable
				players={addedPlayers}
				setPlayers={setAddedPlayers}
				onRemovePlayer={onRemovePlayer}
			/>

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
						<button onClick={() => onRemovePlayer(player.id)}>X</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
