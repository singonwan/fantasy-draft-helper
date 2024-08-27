import { PrismaClient } from '@prisma/client';
import { PLAYERS } from '../data/players'; // Assuming this is the file where your players array is exported

const prisma = new PrismaClient();

async function main() {
	for (const player of PLAYERS) {
		await prisma.player.create({
			data: {
				name: player.name,
				position: player.position,
				team: player.team,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
