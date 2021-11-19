const WrongIdError = require("../exception/WrongIdError");
const PermissionError = require("../exception/PermissionError");
const WrongRefError = require("../exception/WrongRefError");

module.exports = (err, req, res, next) => {
    switch (err.constructor) {
        case WrongIdError: {
            res.status(404).send(err.message);

            break;
        }

        case PermissionError: {
            res.status(403).send(err.message);

            break;
        }

        case WrongRefError: {
            res.status(400).send(err.message);

            break;
        }

        default: {
            res.status(500).send(err.message);
        }
    }
}
