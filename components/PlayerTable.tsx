'use client';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { PLAYERS } from '@/data/players';

const columns = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (props) => <p>{props.getValue()}</p>,
	},
	{
		accessorKey: 'position',
		header: 'Position',
		cell: (props) => <p>{props.getValue()}</p>,
	},
	{
		accessorKey: 'team',
		header: 'Team',
		cell: (props) => <p>{props.getValue()}</p>,
	},
];

const PlayerTable = () => {
	const [players, setPlayers] = useState(PLAYERS);

	const table = useReactTable({
		data: players,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	console.log(table.getHeaderGroups());

	return (
		<div className="w-full p-24">
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PlayerTable;
