import { number } from "@inquirer/prompts";
import { displayScoreGrid } from "./displayScoreGrid";

async function askNextScore(): Promise<number | undefined> {
	return number({ message: "Next throw:", max: 10, min: 0 });
}

export type LastFrame = {
	firstThrow: number;
	secondThrow?: number;
	thirdThrow?: number;
} | null;

export type Frame = { firstThrow: number; secondThrow?: number };

export type Throws = {
	frames: Map<number, Frame>;
	lastFrame: LastFrame;
};

// start game loop
export class BowlingGame {
	async start(rounds: number) {
		console.log("Bowling game has started!");
		console.log("");
		console.log(`You have ${rounds} rounds`);

		const throws: Throws = { lastFrame: null, frames: new Map() };

		displayScoreGrid(rounds, throws);

		// rounds 1 to n - 1
		for (let i = 1; i < rounds; i++) {
			console.log(`-- Round ${i} --`);
			const firstThrow = await askNextScore();
			if (firstThrow === undefined) {
				console.log("Invalid throw");
				continue;
			}
			throws.frames.set(i, { firstThrow });
			displayScoreGrid(rounds, throws);

			const secondThrow = await askNextScore();
			if (secondThrow === undefined) {
				console.log("Invalid throw");
				continue;
			}

			throws.frames.set(i, { firstThrow, secondThrow });
			displayScoreGrid(rounds, throws);
		}

		// last round
		console.log("-- Last round --");
		const firstThrow = await askNextScore();
		if (firstThrow === undefined) {
			console.log("Invalid throw");
			return;
		}

		throws.lastFrame = { firstThrow };
		displayScoreGrid(rounds, throws);

		const secondThrow = await askNextScore();
		if (secondThrow === undefined) {
			console.log("Invalid throw");
			return;
		}

		throws.lastFrame.secondThrow = secondThrow;
		displayScoreGrid(rounds, throws);

		const thirdThrow = await askNextScore();
		if (thirdThrow === undefined) {
			console.log("Invalid throw");
			return;
		}

		throws.lastFrame.thirdThrow = thirdThrow;
		displayScoreGrid(rounds, throws);
	}
}
