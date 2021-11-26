const WrongIdError = require("../exception/WrongIdError");
const PermissionError = require("../exception/PermissionError");
const WrongRefError = require("../exception/WrongRefError");

function formatError(err) {
    return {
        message: err.message
    };
}

module.exports = (err, req, res, next) => {
    console.log(err.message);
    
    
    switch (err.constructor) {
        case WrongIdError: {
            res.status(404);

            break;
        }

        case PermissionError: {
            res.status(403);

            break;
        }

        case WrongRefError: {
            res.status(400);

            break;
        }

        default: {
            res.status(500);
        }
    }

    res.json(formatError(err.message));
}
