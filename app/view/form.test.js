const request = require("supertest");
const app = require("..");

afterEach(() => require("../model").clearDatabase());

describe("Form entity", function () {
    describe("Form getting", () => {
        test("Should get list", async () => {
            await request(app)
                .get("/form/")
                .set(...require("./mock/auth"))
                .expect(200)
                .expect(res => expect(res.body).toEqual([]));
        });
    });

    describe("Form posting", () => {
        test("Should post form", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({_id: "FORM3"})
                .expect(201);
        });

        test("Should post and get form", async () => {
            const item = await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({_id: "FORM3"})
                .expect(201)
                .then(response => response.body);

            await request(app)
                .get(`/form/${item._id}/`)
                .set(...require("./mock/auth"))
                .send({_id: "FORM3"})
                .then(response => {
                    expect(response.body._id).toBe(item._id);
                });
        });

        test("Should post two forms", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({_id: "FORM1"})
                .expect(201);

            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({_id: "FORM2"})
                .expect(201);
        });

        test("Shouldn't post with same id", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({_id: "FORM1"})
                .expect(201);

            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({_id: "FORM1"})
                .expect(500);
        });
    });

    describe("Form posting with fields", () => {
        test("Should post with filed", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM3",
                    field: [{
                        slug: "FIELD",
                        name: "NAME"
                    }]
                })
                .expect(201);
        });

        test("Should post many forms with fields", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM1",
                    field: [{
                        slug: "FIELD",
                        name: "NAME"
                    }]
                })
                .expect(201);

            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM2",
                    field: [{
                        slug: "FIELD",
                        name: "NAME"
                    }]
                })
                .expect(201);
        });

        test("Shouldn't post with filed same slug", async () => {
            await request(app)
                .post("/form/")
                .set(...require("./mock/auth"))
                .send({
                    _id: "FORM3",
                    field: [{
                        slug: "FIELD",
                        name: "NAME"
                    }, {
                        slug: "FIELD",
                        name: "NAME 2"
                    }]
                })
                .expect(400);
        });
    });
});
