const request = require("supertest");
const app = require("..");

afterEach(() => require("../model").clearDatabase());

describe("Result entity", function () {
    describe("Result with permission", () => {
        test("Should get with permission", async () => {
            await request(app)
                .get("/result/")
                .set(...require("./mock/auth"))
                .expect(200)
                .then(res => {
                    expect(res.body).toHaveLength(0);
                });
        });

        test("Shouldn't get without permission", async () => {
            await request(app)
                .get("/result/")
                .expect(403);
        });
    });

    describe("Result posting", () => {
        test("Should post result by form", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "FIELD",
                        name: "FIELD",
                    }]
                })
                .expect(201);

            await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: {"FIELD": "VALUE"}
                })
                .expect(201)
                .then(res => {
                    expect(res.body.form).toBe("FORM");
                    expect(Object.keys(res.body.field)).toHaveLength(1);
                    expect(res.body.field["FIELD"]).toEqual(["VALUE"]);
                });
        });

        test("Should post result and get", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "FIELD",
                        name: "FIELD",
                    }]
                })
                .expect(201);

            const item = await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: {"FIELD": "VALUE"}
                })
                .expect(201)
                .then(res => res.body);

            await request(app)
                .get(`/result/${item._id}/`)
                .set(...require("./mock/auth"))
                .expect(200)
                .then(res => {
                    expect(res.body.form).toBe("FORM");
                    expect(Object.keys(res.body.field)).toHaveLength(1);
                    expect(res.body.field["FIELD"]).toEqual(["VALUE"]);
                });
        });

        test("Should post result with multi fields", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "FIELD_1",
                        name: "FIELD_1",
                    }, {
                        slug: "FIELD_2",
                        name: "FIELD_2",
                    }, {
                        slug: "FIELD_3",
                        name: "FIELD_3",
                    }]
                })
                .expect(201);

            await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: {
                        "FIELD_1": "VALUE_1",
                        "FIELD_2": "VALUE_2",
                        "FIELD_3": "VALUE_3",
                    }
                })
                .expect(201)
                .then(res => {
                    expect(Object.keys(res.body.field)).toHaveLength(3);
                    expect(res.body.field["FIELD_1"]).toEqual(["VALUE_1"]);
                    expect(res.body.field["FIELD_2"]).toEqual(["VALUE_2"]);
                    expect(res.body.field["FIELD_3"]).toEqual(["VALUE_3"]);
                });
        });

        test("Shouldn't post result by form", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "CORRECT",
                        name: "FIELD",
                    }]
                })
                .expect(201);

            await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: {
                        "WRONG": "VALUE",
                    }
                })
                .expect(400);
        });

    });

    describe("Result posting with required fields", () => {
        test("Should post result with required field", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "CORRECT",
                        required: true,
                    }]
                })
                .expect(201);

            await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: {"CORRECT": "VALUE"}
                })
                .expect(201);
        });

        test("Should post result with many required fields", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "CORRECT",
                        required: true,
                    }, {
                        slug: "REQUIRED",
                        required: true,
                    }, {
                        slug: "NOT_REQUIRED",
                        required: false,
                    }]
                })
                .expect(201);

            await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: {
                        "CORRECT": "VALUE",
                        "REQUIRED": "VALUE",
                        "NOT_REQUIRED": "VALUE",
                    },
                })
                .expect(201)
                .then(res => {
                    expect(res.body.form).toBe("FORM");
                    expect(Object.keys(res.body.field)).toHaveLength(3);
                    expect(res.body.field["CORRECT"]).toEqual(["VALUE"]);
                    expect(res.body.field["REQUIRED"]).toEqual(["VALUE"]);
                    expect(res.body.field["NOT_REQUIRED"]).toEqual(["VALUE"]);
                });
        });

        test("Shouldn't post result without required field", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "CORRECT",
                        required: true,
                    }]
                })
                .expect(201);

            await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: []
                })
                .expect(400);
        });

        test("Shouldn't post result with and without required field", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM",
                    field: [{
                        slug: "CASUAL",
                        required: true,
                    }, {
                        slug: "REQUIRED",
                        required: true,
                    }, {
                        slug: "ALSO_REQUIRED",
                        required: true,
                    }]
                })
                .expect(201);

            await request(app)
                .post("/result/")
                .set(...require("./mock/auth"))
                .send({
                    form: "FORM",
                    field: {"REQUIRED": "VALUE"}
                })
                .expect(400);
        });
    });
});
