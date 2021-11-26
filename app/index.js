const app = require("express")();

app.use(require("./model"));
app.use(require("cors")({}));
app.use(require('body-parser').json());
app.use(require("./permission"));

app.get("/", (req, res) => {
    res.send("¬¬¬ FORMS, FORMS, FORMS");
});

app.use("/form/", require("./view/form"));
app.use("/result/", require("./view/result"));
app.use("/permission/", require("./view/permission"));

app.use(require("./exception"));

module.exports = app;
