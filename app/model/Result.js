const mongoose = require("mongoose");
const Form = require("./Form");
const WrongRefError = require("../exception/WrongRefError");

const ResultSchema = new mongoose.Schema({
    timestamp: Date,
    form: {
        type: String,
        ref: Form,
    },
    field: {
        type: Map,
        of: [String],
    },
});

ResultSchema.pre("save", function (next) {
    this.timestamp = new Date();

    next();
});

ResultSchema.post("validate", async function (doc) {
    WrongRefError.assert(
        doc.form,
        "Form id required!",
    );

    const form = await Form.findById(doc.form);

    WrongRefError.assert(
        form,
        "Wrong form type!",
    );

    for (const field of doc.field.keys()) {
        WrongRefError.assert(
            form.field.find(item => item.slug === field),
            `Field with slug ${field} not found!`,
        );
    }

    for (const source of form.field) {
        WrongRefError.assert(
            !source.required || [...doc.field.keys()].find(item => item.field === source.slug),
            `Field ${source.slug} population required!`,
        );
    }
});

module.exports = mongoose.model("result", ResultSchema);
