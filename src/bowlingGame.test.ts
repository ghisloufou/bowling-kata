import { describe, expect, it, vi } from "vitest";
import { BowlingGame } from "./bowlingGame";

describe("bowlingGame class", () => {
	it("should verify askNextThrowScore calls for 4 rounds", async () => {
		const getNextNumberMock = vi.fn().mockReturnValue(2);
		await new BowlingGame(getNextNumberMock).start(4);

		expect(getNextNumberMock).toHaveBeenCalledTimes(8);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(1, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(2, "Second throw:", 8);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(3, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(4, "Second throw:", 8);
	});

	it("should verify askNextThrowScore calls for 10 rounds", async () => {
		const getNextNumberMock = vi.fn().mockReturnValue(3);
		await new BowlingGame(getNextNumberMock).start(10);

		expect(getNextNumberMock).toHaveBeenCalledTimes(20);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(1, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(2, "Second throw:", 7);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(3, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(4, "Second throw:", 7);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(5, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(6, "Second throw:", 7);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(7, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(8, "Second throw:", 7);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(9, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(10, "Second throw:", 7);
	});

	it("should verify askNextThrowScore calls for 10 strike rounds", async () => {
		const getNextNumberMock = vi.fn().mockReturnValue(10);
		await new BowlingGame(getNextNumberMock).start(10);

		expect(getNextNumberMock).toHaveBeenCalledTimes(12);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(1, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(2, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(3, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(4, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(5, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(6, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(7, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(8, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(9, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(10, "First throw:");
		expect(getNextNumberMock).toHaveBeenNthCalledWith(11, "Second throw:", 10);
		expect(getNextNumberMock).toHaveBeenNthCalledWith(12, "Last throw:");
	});
});
