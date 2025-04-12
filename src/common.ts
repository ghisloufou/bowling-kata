export const FRAME_WIDTH = 4;
export const EMPTY_FRAME = " ".repeat(FRAME_WIDTH);

export function getRemainingSpaces(stringLength: number) {
	const remainingSpacesSize = FRAME_WIDTH - stringLength;
	return " ".repeat(remainingSpacesSize);
}
