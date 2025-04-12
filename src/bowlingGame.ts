import { number } from "@inquirer/prompts";
import { printScoreGrid } from "./printScoreGrid";

async function askNextScore(message: string, max = 10): Promise<number> {
	const response = await number({ message: message, max, min: 0 });

	if (response === undefined) {
		throw new Error("Error: Invalid number");
	}

	return response;
}

export type LastFrame = {
	firstThrow: number;
	secondThrow?: number;
	thirdThrow?: number;
} | null;

export type Frame = { firstThrow: number; secondThrow?: number };

export type FrameGrid = {
	frames: Map<number, Frame>;
	lastFrame: LastFrame;
};

// start game loop
export class BowlingGame {
	async start(rounds: number) {
		console.log("The bowling game has started!");
		console.log(`You have ${rounds} rounds`);

		const frameGrid: FrameGrid = { lastFrame: null, frames: new Map() };

		printScoreGrid(rounds, frameGrid);

		// rounds 1 to n - 1
		for (let i = 1; i < rounds; i++) {
			console.log(`Round ${i}`);
			const firstThrow = await askNextScore("First throw:");
			frameGrid.frames.set(i, { firstThrow });
			printScoreGrid(rounds, frameGrid);

			if (firstThrow === 10) {
				continue;
			}

			const secondThrow = await askNextScore("Second throw:", 10 - firstThrow);

			frameGrid.frames.set(i, { firstThrow, secondThrow });
			printScoreGrid(rounds, frameGrid);
		}

		// last round
		await handleLastFrame(frameGrid, rounds);
	}
}

async function handleLastFrame(frameGrid: FrameGrid, rounds: number) {
	console.log("Last round");
	const firstThrow = await askNextScore("First throw:");
	frameGrid.lastFrame = { firstThrow: firstThrow };
	printScoreGrid(rounds, frameGrid);

	const secondThrow = await askNextScore("Second throw:");
	frameGrid.lastFrame.secondThrow = secondThrow;
	printScoreGrid(rounds, frameGrid);

	if (firstThrow + secondThrow >= 10) {
		frameGrid.lastFrame.thirdThrow = await askNextScore("Last throw:");
		printScoreGrid(rounds, frameGrid);
	}
}
