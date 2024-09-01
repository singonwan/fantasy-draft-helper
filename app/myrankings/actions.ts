'use server';

import prisma from '@/utils/db';

export async function getAllPlayers() {
	const players = await prisma.player.findMany();
	return players;
}
