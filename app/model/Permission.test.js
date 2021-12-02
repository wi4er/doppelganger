afterEach(() => require("../model").clearDatabase());
beforeAll(() => require("../model").connect());
afterAll(() => require("../model").disconnect());

const Permission = require("./Permission");

describe("Permission result", () => {
    describe("Permission fields", () => {
        test("Should create empty permission", async () => {
            await new Permission({
                entity: "FORM",
                method: "GET",
                group: 1,
            }).save();
        });

        test("Shouldn't create without group", async () => {
            await expect(
                new Permission({
                    entity: "FORM",
                    method: "GET",
                }).save()
            ).rejects.toThrow("Path `group` is required");
        });

        test("Shouldn't create without method", async () => {
            await expect(
                new Permission({
                    entity: "FORM",
                    group: 1,
                }).save()
            ).rejects.toThrow("Path `method` is required");
        });

        test("Shouldn't create with wrong method", async () => {
            await expect(
                new Permission({
                    method: "WRONG",
                    entity: "FORM",
                    group: 1,
                }).save()
            ).rejects.toThrow("is not a valid enum value for path");
        });

        test("Shouldn't create without entity", async () => {
            await expect(
                new Permission({
                    method: "GET",
                    group: 1,
                }).save()
            ).rejects.toThrow("Path `entity` is required");
        });

        test("Shouldn't create with wrong entity", async () => {
            await expect(
                new Permission({
                    method: "GET",
                    entity: "WRONG",
                    group: 1,
                }).save()
            ).rejects.toThrow("is not a valid enum value for path");
        });
    })
});
