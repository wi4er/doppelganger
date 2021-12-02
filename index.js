const env = require("./environment");
const http = require('http');

http.createServer(require("./app")).listen(env.PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`SERVER STARTS AT >>>>>>> ${env.PORT} !!!!`);
    }
});
