import { nowInSeconds, getLocaleString } from './date';

describe("date utils tests", () => {
    it("should return current time in seconds", () => {
        const now = nowInSeconds();
        expect(now).toBeGreaterThan(0);
    });

    it("should return local date string", () => {
        const specificDate = "7/16/2022, 3:31:01 AM";
        const date = new Date(specificDate).getTime() / 1000;
        const localeString = getLocaleString(date);
        expect(localeString).toEqual(specificDate);
    });

})