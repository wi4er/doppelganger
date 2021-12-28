const Form = require("./Form");
const Result = require("./Result");
const {WrongIdError} = require("../exception/WrongIdError");

afterEach(() => require("../model").clearDatabase());
beforeAll(() => require("../model").connect());
afterAll(() => require("../model").disconnect());

describe("Form result", () => {
    describe("Result adding", () => {
        test("Should create result", async () => {
            await new Form({
                _id: "FORM",
                field: [
                    {slug: "FIELD", value: "VALUE"}
                ],
            }).save();

            await new Result({
                form: "FORM",
                field: {
                    "FIELD": "VALUE"
                }
            }).save();
        });

        test("Shouldn't create result with wrong form", async () => {
            await new Form({
                _id: "FORM",
                field: [],
            }).save();

            await expect(
                new Result({
                    form: "WRONG",
                    field: []
                }).save()
            ).rejects.toThrow(WrongIdError);
        });

        test("Shouldn't create result with wrong field", async () => {
            await new Form({
                _id: "FORM",
                field: [{
                    field: "FIELD",
                    value: "VALUE",
                }],
            }).save();

            await expect(
                new Result({
                    form: "FORM",
                    field: {
                        "WRONG": "VALUE"
                    }
                }).save()
            ).rejects.toThrow(WrongIdError);
        });

        test("Shouldn't create result with wrong and correct fields", async () => {
            await new Form({
                _id: "FORM",
                field: [{
                    slug: "CORRECT",
                    value: "VALUE",
                }],
            }).save();

            await expect(
                new Result({
                    form: "FORM",
                    field: {
                        "CORRECT": "VALUE",
                        "WRONG": "VALUE",
                    }
                }).save()
            ).rejects.toThrow("Field with slug WRONG not found!");
        });
    });

    describe("Result updating", () => {


    });

    // test("Should create with extra field", async () => {
    //     await new Form({_id: "FORM"}).save();
    //
    //     const inst = await new Result({
    //         form: "FORM",
    //         field: [
    //             {field: "FIELD", value: "VALUE"},
    //             {field: "WRONG", value: "VALUE"},
    //         ]
    //     }).save();
    //
    //     const res = await Result.findById(inst._id).exec()
    //
    //     console.log(res);
    // });
});
