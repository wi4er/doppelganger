const mongoose = require("mongoose");
const WrongIdError = require("../exception/WrongIdError");
const WrongRefError = require("../exception/WrongRefError");

const FormFieldSchema = new mongoose.Schema({
    slug: String,
    type: {
        type: String,
        default: "String",
    },
    name: {
        type: String,
        default: "",
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const FormSchema = new mongoose.Schema({
    _id: String,
    timestamp: Date,
    name: String,
    field: [FormFieldSchema],
});

FormSchema.pre("save", function(next) {
    this.timestamp = new Date();

    next();
});

FormSchema.post("validate", doc => {
    if (doc.field) {
        const slugs = new Set(doc.field.map(item => item.slug))

        WrongRefError.assert(
            slugs.size === doc.field.length,
            "Field id must be uniq!"
        )
    }
});

module.exports = mongoose.model("form", FormSchema);
