'use server';

import prisma from '@/utils/db';

export async function getAllPlayers() {
	const players = await prisma.player.findMany();
	return players;
}

export async function saveRankings(userId, rankArray) {
	// let data = []

	// have to delete all rankings of user first
	const deleteOldData = await prisma.ranking.deleteMany({
		where: {
			userId: userId,
		},
	});

	// insert new data
	const data = rankArray.map((id, index) => ({
		rank: index,
		playerId: id,
		userId: userId,
	}));

	const playerRanks = await prisma.ranking.createMany({
		data: data,
	});

	console.log(data);
}

export async function getSavedRankings(userId) {
	const playerRankings = await prisma.ranking.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			rank: 'asc',
		},
	});

	console.log('playerRankings', playerRankings);

	const playerIds = playerRankings.map((ranking) => ranking.playerId);

	const players = await prisma.player.findMany({
		where: { id: { in: playerIds } },
	});

	console.log('players', players);

	// Create a map to quickly lookup players by their ID
	const playerMap = new Map(players.map((player) => [player.id, player]));

	// Order the players according to the original playerIds
	const orderedPlayers = playerIds.map((id) => playerMap.get(id));

	return orderedPlayers;
}
