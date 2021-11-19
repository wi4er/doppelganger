afterEach(() => require("../model").clearDatabase());
beforeAll(() => require("../model").connect());
afterAll(() => require("../model").disconnect());

const Permission = require("./Permission");

describe("Permission result", () => {
    describe("Permission adding", () => {
        test("Should create empty permission", async () => {
            await new Permission({
                entity: "FORM",
                method: "GET",
            }).save();
        });

        test("Shouldn't create without method", async () => {
            await expect(
                new Permission({}).save()
            ).rejects.toThrow("Path `method` is required")
        });

        test("Shouldn't create with wrong method", async () => {
            await expect(
                new Permission({
                    method: "WRONG"
                }).save()
            ).rejects.toThrow("is not a valid enum value for path")
        });
    })
});
