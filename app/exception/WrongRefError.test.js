const WrongRefError = require("./WrongRefError");

describe("WrongRefError", () => {
    test("Shouldn't throw error", () => {
        WrongRefError.assert(true, "ERROR");
    });

    test("Should throw error", () => {
        expect(() => {
            WrongRefError.assert(false, "ERROR");
        }).toThrow("ERROR");
    });

    test("Should throw error", () => {
        expect(() => {
            WrongRefError.assert(false, "ERROR");
        }).toThrow(WrongRefError);
    });
});
