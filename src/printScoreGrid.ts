import type { Frame, FrameGrid, LastFrame } from "./bowlingGame";
import { EMPTY_FRAME, getRemainingSpaces } from "./common";
import { formatFrameNumberLine } from "./formatFrameNumberLine";

export function printScoreGrid(totalFrames: number, throws: FrameGrid) {
	console.log(formatScoreGrid(totalFrames, throws));
}

export function formatScoreGrid(
	totalFrames: number,
	throws: FrameGrid,
): string {
	const frameLine = formatFrameNumberLine(totalFrames);
	const frameScore = formatFrameScoreLine(totalFrames, throws);
	const totalScore = formatTotalScoreLine(totalFrames, throws);

	return `
	${frameLine}
	${frameScore}
	${totalScore}`;
}

export function formatTotalScoreLine(
	totalFrames: number,
	throws: FrameGrid,
): string {
	const totalScore = ["Total score	"];

	for (let i = 1; i < totalFrames; i++) {
		const frame = throws.frames.get(i);
		if (frame === undefined) {
			totalScore.push(EMPTY_FRAME);
			continue;
		}

		const frameTotalScore = getFrameTotalScore(throws, i).toString();
		const formattedScore = `${getRemainingSpaces(frameTotalScore.length)}${frameTotalScore}`;
		totalScore.push(formattedScore);
	}

	if (throws.lastFrame === null) {
		totalScore.push(EMPTY_FRAME);
	} else {
		const lastFrameTotalScore = getLastFrameTotalScore(throws).toString();
		totalScore.push(
			`${getRemainingSpaces(lastFrameTotalScore.length)}${lastFrameTotalScore}`,
		);
	}

	return `${totalScore.join("|")}|`;
}

function formatFrameScore(frame: Frame): string {
	let frameScore = formatFirstThrow(frame.firstThrow);

	if (frame.secondThrow !== undefined) {
		frameScore += ` ${formatSecondThrow(frame.firstThrow, frame.secondThrow)}`;
	} else if (frameScore !== "x") {
		frameScore += "  ";
	}

	return `${getRemainingSpaces(frameScore.length)}${frameScore}`;
}

function formatFrameScoreLine(totalFrames: number, throws: FrameGrid): string {
	const frameScore = ["Frame score	"];

	for (let i = 1; i < totalFrames; i++) {
		const frame = throws.frames.get(i);
		if (frame === undefined) {
			frameScore.push(EMPTY_FRAME);
			continue;
		}

		frameScore.push(formatFrameScore(frame));
	}

	frameScore.push(formatLastFrameScore(throws.lastFrame));

	return `${frameScore.join("|")}|`;
}

export function formatFirstThrow(firstThrow: number): string {
	if (firstThrow === 10) {
		return "x";
	}

	if (firstThrow === 0) {
		return "-";
	}

	return firstThrow.toString();
}

export function formatSecondThrow(
	firstThrow: number,
	secondThrow: number,
): string {
	if (firstThrow + secondThrow === 10) {
		return "/";
	}

	if (secondThrow === 0) {
		return "-";
	}

	return secondThrow.toString();
}

function formatLastFrameSecondThrow(
	firstThrow: number,
	secondThrow: number,
): string {
	if (firstThrow + secondThrow === 10) {
		return "/";
	}

	return formatFirstThrow(secondThrow);
}

function formatLastFrameScore(frame: LastFrame): string {
	if (frame === null) {
		return EMPTY_FRAME;
	}

	let frameScore = formatFirstThrow(frame.firstThrow);

	if (frame.secondThrow !== undefined) {
		if (frame.thirdThrow === undefined) {
			frameScore += `${formatLastFrameSecondThrow(frame.firstThrow, frame.secondThrow)} `;
		} else {
			frameScore += `${formatLastFrameSecondThrow(frame.firstThrow, frame.secondThrow)}${formatFirstThrow(frame.thirdThrow)}`;
		}
	}

	return `${getRemainingSpaces(frameScore.length)}${frameScore}`;
}

function calculateStrikeAdditionalPoints(
	throws: FrameGrid,
	frameNumber: number,
): number {
	const nextFrame = getNextFrame(throws, frameNumber + 1);

	if (nextFrame === undefined || nextFrame === null) {
		return 0;
	}

	const points = nextFrame.firstThrow;

	if (nextFrame.secondThrow !== undefined) {
		return points + nextFrame.secondThrow;
	}

	const nextNextFrame = getNextFrame(throws, frameNumber + 2);
	if (nextNextFrame === undefined || nextNextFrame === null) {
		return points;
	}

	return points + nextNextFrame.firstThrow;
}

function getFrameTotalScore(throws: FrameGrid, frameNumber: number): number {
	const frame = throws.frames.get(frameNumber);

	if (frame === undefined) {
		return 0;
	}

	const previousTotalScore = getFrameTotalScore(throws, frameNumber - 1);

	let totalScore =
		previousTotalScore + frame.firstThrow + (frame.secondThrow ?? 0);

	// Handle strike
	if (frame.firstThrow === 10) {
		totalScore += calculateStrikeAdditionalPoints(throws, frameNumber);
	}

	// Handle spare
	if (
		frame.secondThrow !== undefined &&
		frame.firstThrow + frame.secondThrow === 10
	) {
		const nextFrame = getNextFrame(throws, frameNumber + 1);
		if (nextFrame) {
			totalScore += nextFrame.firstThrow;
		}
	}

	return totalScore;
}

function getNextFrame(
	throws: FrameGrid,
	nextFrame: number,
): Frame | undefined | LastFrame {
	if (nextFrame > throws.frames.size) {
		return throws.lastFrame;
	}
	return throws.frames.get(nextFrame);
}

function getLastFrameTotalScore(throws: FrameGrid): number {
	const frame = throws.lastFrame;

	if (frame === null) {
		return 0;
	}

	const previousTotalScore = getFrameTotalScore(throws, throws.frames.size);

	return (
		previousTotalScore +
		frame.firstThrow +
		(frame.secondThrow ?? 0) +
		(frame.thirdThrow ?? 0)
	);
}
