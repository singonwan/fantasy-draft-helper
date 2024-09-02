'use client';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnDef,
	Row,
} from '@tanstack/react-table';
import React, { CSSProperties, useContext } from 'react';
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Player } from '@/types';
import { IoMdCloseCircle } from 'react-icons/io';
import { UserContext } from '../store/user-context';

// Cell Component
const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
	const { attributes, listeners } = useSortable({
		id: rowId,
	});
	return (
		// Alternatively, you could set these attributes on the rows themselves
		<button {...attributes} {...listeners}>
			🟰
		</button>
	);
};

// Row Component
const DraggableRow = ({ row }: { row: Row<Player> }) => {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id,
	});

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
		transition: transition,
		opacity: isDragging ? 0.8 : 1,
		zIndex: isDragging ? 1 : 0,
		position: 'relative',
	};
	return (
		// connect row ref to dnd-kit, apply important styles
		<tr
			ref={setNodeRef}
			style={style}
			className={`bg-gradient-to-r${
				row.original.position === 'QB'
					? ' from-slate-300 to-red-400'
					: row.original.position === 'RB'
					? ' from-slate-300 to-green-300'
					: row.original.position === 'WR'
					? ' from-slate-300 to-blue-400'
					: ' from-slate-300 to-orange-300'
			}
			`}
		>
			{row.getVisibleCells().map((cell) => {
				return (
					<td
						key={cell.id}
						style={{ width: cell.column.getSize() }}
						className={`px-6 py-2 whitespace-nowrap text-center`}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				);
			})}
		</tr>
	);
};

type PlayerTableProps = {
	players: Player[];
	setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
	onRemovePlayer: (id: string) => void;
	filtered: boolean;
	positionSelected: string;
};

const PlayerTable: React.FC<PlayerTableProps> = ({
	players,
	setPlayers,
	onRemovePlayer,
	filtered,
	positionSelected,
}) => {
	const userctx = useContext(UserContext);

	const memoColumns = React.useMemo<ColumnDef<Player>[]>(
		() => [
			{
				id: 'drag-handle',
				header: 'Rank',
				cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
				size: 60,
			},
			{
				accessorKey: 'name',
				header: 'Name',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'position',
				header: 'Position',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'team',
				header: 'Team',
				cell: (info) => info.getValue(),
			},
		],
		[] // when adding dependency => drag and drop stops working.
	);
	let columns = [];
	if (!filtered) {
		const nonMemoColumns: ColumnDef<Player>[] = [
			{
				accessorKey: 'id',
				header: 'Remove/Drafted',
				cell: ({ row }) => (
					<div className="font-bold flex justify-center items-center">
						<button onClick={() => onRemovePlayer(row.original.id)}>
							<IoMdCloseCircle size={24} />
						</button>
					</div>
				),
			},
		];

		columns = [...memoColumns, ...nonMemoColumns];
	} else {
		columns = [...memoColumns];
	}

	const dataIds = React.useMemo<UniqueIdentifier[]>(
		() => players?.map(({ id }) => id),
		[players]
	);

	const table = useReactTable({
		data: players,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	// reorder rows after drag & drop
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setPlayers((data) => {
				const oldIndex = dataIds.indexOf(active.id);
				const newIndex = dataIds.indexOf(over.id);
				return arrayMove(data, oldIndex, newIndex); //this is just a splice util
			});
		}
	}

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);

	function handleSave() {
		console.log(
			'Row IDs:',
			table.getRowModel().rows.map((row) => row.id)
		);
	}

	return (
		<>
			<DndContext
				collisionDetection={closestCenter}
				modifiers={[restrictToVerticalAxis]}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<div className="w-full px-24 pt-4 pb-40 flex items-center justify-center">
					<table className="table w-10/12 divide-y divide-gray-200 relative">
						<thead className="bg-slate-300">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="table-row">
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											colSpan={header.colSpan}
											className="uppercase p-2"
										>
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
						<tbody className={`divide-y divide-gray-200`}>
							<SortableContext
								items={dataIds}
								strategy={verticalListSortingStrategy}
							>
								{table.getRowModel().rows.map((row) => (
									<DraggableRow key={row.id} row={row} />
								))}
							</SortableContext>
						</tbody>
					</table>
				</div>
			</DndContext>
			<div className="flex items-center justify-center flex-col">
				<p className="text-xs">
					Your data can be saved if you are logged in and have the position tab
					at ALL
				</p>
			</div>
			{userctx.user && positionSelected === 'ALL' && (
				<div className="flex items-center justify-center flex-col pb-40">
					<p>{positionSelected}</p>
					<p>
						{userctx.user?.id} {userctx.user?.name}
					</p>
					<button
						className="hidden select-none rounded-lg bg-gradient-to-tr from-purple-900 to-purple-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
						onClick={handleSave}
					>
						save
					</button>
				</div>
			)}
		</>
	);
};

export default PlayerTable;
