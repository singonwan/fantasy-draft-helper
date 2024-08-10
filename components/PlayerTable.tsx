'use client';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnDef,
	Row,
} from '@tanstack/react-table';
import React, { CSSProperties } from 'react';
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
		<tr ref={setNodeRef} style={style}>
			{row.getVisibleCells().map((cell) => (
				<td key={cell.id} style={{ width: cell.column.getSize() }}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</td>
			))}
		</tr>
	);
};

const PlayerTable = ({ players, setPlayers }) => {
	const columns = React.useMemo<ColumnDef<Player>[]>(
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
		[]
	);

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

	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
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
	);
};

export default PlayerTable;
