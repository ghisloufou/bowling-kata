import { number } from "@inquirer/prompts";

export async function getNumberFromUser(
	message: string,
	max = 10,
): Promise<number> {
	const response = await number({ message: message, max, min: 0 });

	if (response === undefined) {
		throw new Error("Error: Invalid number");
	}

	return response;
}
