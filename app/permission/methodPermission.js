const Permission = require("../model/Permission");
const PermissionError = require("../exception/PermissionError");

async function checkMethod(entity, method, user) {
    const row = await Permission.findOne({entity, method}).exec();

    // console.log(row, user);
    
    
    // if (!row && !user?.admin) {
    //     throw new PermissionError("Permission denied!")
    // }
}

module.exports = {
    checkMethod,
};
