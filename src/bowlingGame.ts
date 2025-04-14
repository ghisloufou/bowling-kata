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

export type ScoreGrid = {
	frames: Map<number, Frame>;
	lastFrame: LastFrame;
};

export class BowlingGame {
	async start(rounds: number) {
		console.log("The bowling game has started!");
		console.log(`You have ${rounds} rounds`);

		const scoreGrid: ScoreGrid = { frames: new Map(), lastFrame: null };

		printScoreGrid(rounds, scoreGrid);

		// handle rounds 1 to n - 1
		for (let i = 1; i < rounds; i++) {
			console.log(`Round ${i}`);
			const firstThrow = await askNextScore("First throw:");
			scoreGrid.frames.set(i, { firstThrow });
			printScoreGrid(rounds, scoreGrid);

			if (firstThrow === 10) {
				continue;
			}

			const secondThrow = await askNextScore("Second throw:", 10 - firstThrow);

			scoreGrid.frames.set(i, { firstThrow, secondThrow });
			printScoreGrid(rounds, scoreGrid);
		}

		// handle last round
		console.log("Last round");
		const firstThrow = await askNextScore("First throw:");
		scoreGrid.lastFrame = { firstThrow: firstThrow };
		printScoreGrid(rounds, scoreGrid);

		const secondThrow = await askNextScore(
			"Second throw:",
			10 - (firstThrow === 10 ? 0 : firstThrow),
		);
		scoreGrid.lastFrame.secondThrow = secondThrow;
		printScoreGrid(rounds, scoreGrid);

		if (firstThrow + secondThrow >= 10) {
			scoreGrid.lastFrame.thirdThrow = await askNextScore("Last throw:");
			printScoreGrid(rounds, scoreGrid);
		}
	}
}
