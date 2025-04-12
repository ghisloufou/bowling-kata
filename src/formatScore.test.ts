import { describe, expect, it } from "vitest";
import { formatScoreGrid } from "./displayScoreGrid";

import type { Throws } from "./bowlingGame";

describe("formatScoreGrid", () => {
	it("should return formatted score for frame 1 throw 1", () => {
		const frames: Throws["frames"] = new Map();

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
		const frames: Throws["frames"] = new Map();

		frames.set(1, {
			firstThrow: 1,
			secondThrow: 2,
		});

		const actual = formatScoreGrid(10, {
			frames: frames,
			lastFrame: null,
		});

		const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	| 1 2|    |    |    |    |    |    |    |    |    |
	Total score	|   3|    |    |    |    |    |    |    |    |    |`;

		expect(actual).toEqual(expected);
	});

	it("should return formatted score for 2 simple frames", () => {
		const frames: Throws["frames"] = new Map();

		frames.set(1, {
			firstThrow: 1,
			secondThrow: 2,
		});
		frames.set(2, {
			firstThrow: 1,
			secondThrow: 2,
		});

		const actual = formatScoreGrid(10, {
			frames: frames,
			lastFrame: null,
		});

		const expected = `
	Frame		|   1|   2|   3|   4|   5|   6|   7|   8|   9|  10|
	Frame score	| 1 2| 1 2|    |    |    |    |    |    |    |    |
	Total score	|   3|   6|    |    |    |    |    |    |    |    |`;

		expect(actual).toEqual(expected);
	});
});
