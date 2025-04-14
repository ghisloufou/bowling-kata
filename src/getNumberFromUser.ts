import { number } from "@inquirer/prompts";
import type { AskNextThrowScore } from "./bowlingGame";

export const getNumberFromUser: AskNextThrowScore = async (
	message,
	max = 10,
) => {
	const response = await number({ message: message, max, min: 0 });

	if (response === undefined) {
		throw new Error("Error: Invalid number");
	}

	return response;
};
