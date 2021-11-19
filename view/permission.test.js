const
    request = require("supertest"),
    app = require(".");

afterEach(() => require("../model").clearDatabase());

describe("Permission entity", function () {
    describe("Permission getting", () => {
        test("Should get list", async () => {
            await request(app)
                .get("/permission/")
                .set(...require("./mock/auth"))
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual([]);
                });
        });
    });
});
