const app = require("express")();

app.use(require("../model").createConnection());
app.use(require("cors")({}));
app.use(require('body-parser').json());
app.use(require("../permission"));

app.get("/", (req, res) => {
    res.send("¬¬¬ FORMS, FORMS, FORMS");
});

app.use("/form/", require("./form"));
app.use("/result/", require("./result"));
app.use("/permission/", require("./permission"));

app.use(require("../exception"));

module.exports = app;
