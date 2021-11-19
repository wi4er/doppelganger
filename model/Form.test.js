afterEach(() => require("../model").clearDatabase());
beforeAll(() => require("../model").connect());
afterAll(() => require("../model").disconnect());

const Form = require("./Form");

describe("Form entity", () => {
    describe("Form addition", () => {
        test("Should create form", async () => {
            await new Form({_id: "FORM"}).save();
        });

        test("Should create form with field", async () => {
            await new Form({
                _id: "WITH_FIELDS",
                field: [{
                    slug: "name",
                    type: "String",
                    name: "NAME",
                    required: true,
                }]
            }).save();
        });

        test("Should create two form with field", async () => {
            await new Form({
                _id: "FORM_1",
                field: [{
                    slug: "name",
                    type: "String",
                    name: "NAME",
                }]
            }).save();

            await new Form({
                _id: "FORM_2",
                field: [{
                    slug: "name",
                    type: "String",
                    name: "NAME",
                }]
            }).save();
        });

        test("Shouldn't create with not uniq field", done => {
            new Form({
                _id: "WITH_FIELDS",
                field: [{
                    slug: "name",
                    type: "String",
                    name: "NAME",
                }, {
                    slug: "name",
                    type: "String",
                    name: "NAME",
                }]
            }).save().then(
                () => done(new Error("ID must be uniq!")),
                () => done()
            );
        });
    });

    describe("Form getting", () => {
        test("Should get form", async () => {
            await new Form({
                _id: "FORM",
                name: "NAME",
            }).save();

            const inst = await Form.findById("FORM").exec();

            expect(inst._id).toBe("FORM");
            expect(inst.name).toBe("NAME");
            expect(inst.timestamp).not.toBeUndefined();
        });

        test("Should get form with filed", async () => {
            await new Form({
                _id: "FORM",
                name: "NAME",
                field: [{
                    slug: "name",
                }]
            }).save();

            const inst = await Form.findById("FORM").exec();

            expect(inst._id).toBe("FORM");
            expect(inst.field.length).toBe(1);
            expect(inst.field[0].slug).toBe("name");
            expect(inst.field[0].type).toBe("String");
            expect(inst.field[0].required).toBe(false);
        });
    });
});
