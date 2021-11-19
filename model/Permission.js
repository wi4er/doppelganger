const mongoose = require("mongoose");

const methodTypes = [
    "GET",
    "POST",
    "PUT",
    "DELETE"
];

const entityTypes = [
    "FORM",
    "RESULT",
    "PERMISSION",
];

const PermissionSchema = new mongoose.Schema({
    timestamp: Date,
    entity: {
        type: String,
        enum: entityTypes,
        required: true,
    },
    method: {
        type: String,
        enum: methodTypes,
        required: true,
    },
    group: {
        type: Number,
        default: 0,
    },
});

PermissionSchema.pre("save", function(next) {
    this.timestamp = new Date();

    next();
});

PermissionSchema.post("validate", doc => {

});

module.exports = mongoose.model("permission", PermissionSchema);
