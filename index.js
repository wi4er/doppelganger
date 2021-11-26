const chalk = require("chalk");
const env = require("./environment");

require("./app").listen(env.PORT, err => {
    if (err) {
        console.log(chalk.bgRed(err));
    } else {
        console.log(chalk.greenBright(`>>> Server starts at ${env.PORT} >>>>`));
    }
});
