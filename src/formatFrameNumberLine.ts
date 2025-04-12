import { getRemainingSpaces } from "./common";

function formatFrameNumber(frameNumber: number): string {
	const remainingSpaces = getRemainingSpaces(frameNumber.toString().length);
	return `${remainingSpaces}${frameNumber}`;
}

export function formatFrameNumberLine(totalFrames: number): string {
	const frameLine = ["Frame		"];

	for (let i = 1; i <= totalFrames; i++) {
		frameLine.push(formatFrameNumber(i));
	}

	return `${frameLine.join("|")}|`;
}
