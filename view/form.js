const {Router} = require("express");
const router = Router();
const formQuery = require("../query/formQuery");
const Form = require("../model/Form");
const WrongIdError = require("../exception/WrongIdError");
const {checkMethod} = require("../permission/methodPermission");
const {FORM} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");

router.get("/", (req, res, next) => {
    checkMethod(FORM, GET, req.user)
        .then(() => Form.find(
            formQuery.parseFilter(req.query.filter)
        ))
        .then(result => res.send(result))
        .catch(next);
});

router.get("/:id/", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(FORM, GET, req.user)
        .then(() => Form.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant find from with id ${id}!`);

            res.send(result);
        })
        .catch(next);
});

router.post("/", (req, res, next) => {
    checkMethod(FORM, POST, req.user)
        .then(() => new Form(req.body).save())
        .then(result => {
            res.status(201);
            res.send(result);
        })
        .catch(next);
});

router.put("/:id/", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(FORM, PUT, req.user)
        .then(() => Form.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant update form with id ${id}!`);

            return Object.assign(result, req.body).save();
        })
        .then(saved => res.send(saved))
        .catch(next);
});

router.delete("/:id/", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(FORM, DELETE, req.user)
        .then(() => Form.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant delete form with id ${id}!`);

            return result.delete();
        })
        .then(() => res.send(true))
        .catch(next);
});

module.exports = router;
