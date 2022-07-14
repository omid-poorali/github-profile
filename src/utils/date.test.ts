import { nowInSeconds } from './date';

describe("date utils tests", () => {
    it("should return current time in seconds", () => {
        const now = nowInSeconds();
        expect(now).toBeGreaterThan(0);
    });
})