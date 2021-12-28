const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    timestamp: Date,
    entity: {
        type: String,
        enum: require("../permission/entity"),
        required: true,
    },
    method: {
        type: String,
        enum: require("../permission/method"),
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
});

PermissionSchema.pre("save", function(next) {
    this.timestamp = new Date();

    next();
});

module.exports = mongoose.model("permission", PermissionSchema);
