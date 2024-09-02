'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import PlayerTable from './PlayerTable';
import { POSITIONS } from '@/data/positions';
import { Player, PlayerPosition } from '@/types';
import {
	Field,
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserContext } from '@/store/user-context';

const SearchBar = ({
	allPlayers,
	session,
}: {
	allPlayers: Player[];
	session: { userId: string; userName: string } | null;
	// 	addedPlayers,
	// 	setAddedPlayers,
	// 	filteredPlayers,
	// 	setFilteredPlayers,
	// }: {
	// 	addedPlayers: Player[];
	// 	setAddedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
	// 	filteredPlayers: Player[];
	// 	setFilteredPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [positionSelected, setPositionSelected] = useState<PlayerPosition>(
		POSITIONS[0]
	);
	const [addedPlayers, setAddedPlayers] = useState<Player[]>([]);
	const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

	// adding user context
	const userctx = useContext(UserContext);

	useEffect(() => {
		if (session) {
			userctx.setUser({ id: session.userId, name: session.userName });
		}
	}, [session, userctx]);

	const searchFilteredPlayers = allPlayers.filter(
		(player) =>
			searchTerm.length > 0 &&
			player.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handlePositionChange = (value: PlayerPosition) => {
		setPositionSelected(value);

		let updatedPlayers = [...addedPlayers];
		const filterPlayers = updatedPlayers.filter(
			(player) => player.position === value.position
		);

		setFilteredPlayers(filterPlayers);
	};

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
		setSearchTerm('');
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

	let players = addedPlayers;

	// console.log(positionSelected);

	if (positionSelected.position !== 'ALL') {
		players = filteredPlayers;
	}

	return (
		<div className="w-full flex flex-col items-center justify-center flex-wrap pt-4">
			<div className="w-10/12 px-24 flex items-center justify-center">
				<div className="flex items-center justify-center w-full relative">
					<div className="flex flex-col items-center">
						<label className="font-bold  text-md uppercase text-center">
							Player Search
						</label>
						<div className="relative w-full">
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
							<ul className="absolute z-50 w-96 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
								{searchFilteredPlayers.slice(0, 8).map((player) => (
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
				</div>
			</div>

			<div className="grid grid-cols-3 w-10/12 px-24">
				<p></p>
				<p></p>
				<div className="mx-auto w-40 pt-4 ">
					<Field>
						<Label>Position</Label>
						<Listbox value={positionSelected} onChange={handlePositionChange}>
							<ListboxButton
								className={clsx(
									'relative block w-full rounded-lg bg-black/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black',
									'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
								)}
							>
								{positionSelected.position}
								<ChevronDownIcon
									className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
									aria-hidden="true"
								/>
							</ListboxButton>
							<ListboxOptions
								anchor="bottom"
								transition
								className={clsx(
									'w-[var(--button-width)] rounded-xl border border-black/5 bg-[#f4f4f4] p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
									'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-100'
								)}
							>
								{POSITIONS.map((position) => (
									<ListboxOption
										key={position.position}
										value={position}
										className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
									>
										<CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
										<div className="text-sm/6 text-black">
											{position.position}
										</div>
									</ListboxOption>
								))}
							</ListboxOptions>
						</Listbox>
					</Field>
					<p className="text-xs">
						note: players cannot be added or dragged and dropped when a specific
						position is selected, to make changes to the ranking select ALL
						poistions
					</p>
				</div>
			</div>

			<div className="w-10/12 px-24 py-10">
				<h1 className="text-xl font-bold uppercase">Your Rankings</h1>
			</div>

			<PlayerTable
				filtered={positionSelected.position === 'ALL' ? false : true}
				players={players}
				setPlayers={setAddedPlayers}
				onRemovePlayer={onRemovePlayer}
			/>

			{/* <div className="w-full p-24">
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
			</div> */}
		</div>
	);
};

export default SearchBar;
