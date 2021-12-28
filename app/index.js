try {
    const app = require("express")();

    app.use(require("./model"));
    app.use(require("cors")({}));
    app.use(require('body-parser').json());
    app.use(require("./permission"));

    app.get("/", (req, res) => {
        res.send("<h1 style='display: flex; align-items: center; justify-content: center; height: 100%'>¬¬¬ FORMS, FORMS, FORMS</h1>");
    });

    app.use("/form/", require("./view/form"));
    app.use("/result/", require("./view/result"));
    app.use("/permission/", require("./view/permission"));

    app.use(require("./exception"));

    module.exports = app;
} catch (e) {
    module.exports = (req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({message: e.message}));
        res.end();
    }
}
