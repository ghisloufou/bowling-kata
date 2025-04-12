import { describe, expect, it } from "vitest";
import { formatScoreGrid } from "./printScoreGrid";

import type { FrameGrid } from "./bowlingGame";

describe("formatScoreGrid", () => {
	const spareFrame = {
		firstThrow: 5,
		secondThrow: 5,
	};

	const normalFrame = {
		firstThrow: 2,
		secondThrow: 3,
	};

	const strikeFrame = {
		firstThrow: 10,
	};

	it("should return formatted score for frame 1 throw 1", () => {
		const frames: FrameGrid["frames"] = new Map();

		frames.set(1, {
			firstThrow: 1,
		});

		const actual = formatScoreGrid(10, {
			frames: frames,
			lastFrame: null,
		});

		const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	| 1  |    |    |    |    |    |    |    |    |    |
	Total score	|   1|    |    |    |    |    |    |    |    |    |`;

		expect(actual).toEqual(expected);
	});

	it("should return formatted score for frame 1 throw 2", () => {
		const frames: FrameGrid["frames"] = new Map();

		frames.set(1, normalFrame);

		const actual = formatScoreGrid(10, {
			frames: frames,
			lastFrame: null,
		});

		const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	| 2 3|    |    |    |    |    |    |    |    |    |
	Total score	|   5|    |    |    |    |    |    |    |    |    |`;

		expect(actual).toEqual(expected);
	});
	it("should return formatted score for 2 simple frames", () => {
		const frames: FrameGrid["frames"] = new Map();

		frames.set(1, normalFrame);
		frames.set(2, normalFrame);

		const actual = formatScoreGrid(10, {
			frames: frames,
			lastFrame: null,
		});

		const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	| 2 3| 2 3|    |    |    |    |    |    |    |    |
	Total score	|   5|  10|    |    |    |    |    |    |    |    |`;

		expect(actual).toEqual(expected);
	});

	describe("spare handling", () => {
		it("should return formatted score when current throw is a spare", () => {
			const frames: FrameGrid["frames"] = new Map();

			frames.set(1, spareFrame);

			const actual = formatScoreGrid(10, {
				frames: frames,
				lastFrame: null,
			});

			const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	| 5 /|    |    |    |    |    |    |    |    |    |
	Total score	|  10|    |    |    |    |    |    |    |    |    |`;

			expect(actual).toEqual(expected);
		});

		it("should return formatted score when last throw is a spare with accumulated score", () => {
			const frames: FrameGrid["frames"] = new Map();

			frames.set(1, spareFrame);
			frames.set(2, normalFrame);

			const actual = formatScoreGrid(10, {
				frames: frames,
				lastFrame: null,
			});

			const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	| 5 /| 2 3|    |    |    |    |    |    |    |    |
	Total score	|  12|  17|    |    |    |    |    |    |    |    |`;

			expect(actual).toEqual(expected);
		});
	});

	describe("strike handling", () => {
		it("should return formatted score when current throw is a strike", () => {
			const frames: FrameGrid["frames"] = new Map();

			frames.set(1, strikeFrame);

			const actual = formatScoreGrid(10, {
				frames: frames,
				lastFrame: null,
			});

			const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	|   x|    |    |    |    |    |    |    |    |    |
	Total score	|  10|    |    |    |    |    |    |    |    |    |`;

			expect(actual).toEqual(expected);
		});

		it("should return formatted score when last throw is a strike with accumulated score", () => {
			const frames: FrameGrid["frames"] = new Map();

			frames.set(1, strikeFrame);
			frames.set(2, normalFrame);

			const actual = formatScoreGrid(10, {
				frames: frames,
				lastFrame: null,
			});

			const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	|   x| 2 3|    |    |    |    |    |    |    |    |
	Total score	|  15|  20|    |    |    |    |    |    |    |    |`;

			expect(actual).toEqual(expected);
		});
	});

	it("should return formatted score for a complex score", () => {
		const frames: FrameGrid["frames"] = new Map();

		frames.set(1, strikeFrame);

		frames.set(2, spareFrame);
		frames.set(3, normalFrame);
		frames.set(4, normalFrame);

		frames.set(5, strikeFrame);

		frames.set(6, normalFrame);
		frames.set(7, normalFrame);
		frames.set(8, spareFrame);

		frames.set(9, normalFrame);

		const actual = formatScoreGrid(10, {
			frames: frames,
			lastFrame: null,
		});

		const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	|   x| 5 /| 2 3| 2 3|   x| 2 3| 2 3| 5 /| 2 3|    |
	Total score	|  20|  32|  37|  42|  57|  62|  67|  79|  84|    |`;

		expect(actual).toEqual(expected);
	});

	it("should return formatted score for the perfect score", () => {
		const frames: FrameGrid["frames"] = new Map();

		frames.set(1, strikeFrame);
		frames.set(2, strikeFrame);
		frames.set(3, strikeFrame);
		frames.set(4, strikeFrame);
		frames.set(5, strikeFrame);
		frames.set(6, strikeFrame);
		frames.set(7, strikeFrame);
		frames.set(8, strikeFrame);
		frames.set(9, strikeFrame);

		const actual = formatScoreGrid(10, {
			frames: frames,
			lastFrame: { firstThrow: 10, secondThrow: 10, thirdThrow: 10 },
		});

		const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	|   x|   x|   x|   x|   x|   x|   x|   x|   x| xxx|
	Total score	|  30|  60|  90| 120| 150| 180| 210| 240| 270| 300|`;

		expect(actual).toEqual(expected);
	});
});
