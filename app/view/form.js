const {Router} = require("express");
const router = Router();
const Form = require("../model/Form");
const WrongIdError = require("../exception/WrongIdError");
const {FORM} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");
const permissionCheck = require("../permission/check");

router.get(
    "/",
    permissionCheck(FORM, GET),
    (req, res, next) => {
        Form.find(
            require("../query/formQuery").parseFilter(req.query.filter)
        )
            .then(result => res.send(result))
            .catch(next);
    });

router.get(
    "/:id/",
    permissionCheck(FORM, GET),
    (req, res, next) => {
        const {params: {id}} = req;

        Form.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant find from with id ${id}!`);

                res.send(result);
            })
            .catch(next);
    });

router.post(
    "/",
    permissionCheck(FORM, POST),
    (req, res, next) => {
        new Form(req.body).save()
            .then(result => {
                res.status(201);
                res.send(result);
            })
            .catch(next);
    });

router.put(
    "/:id/",
    permissionCheck(FORM, PUT),
    (req, res, next) => {
        const {params: {id}} = req;

        WrongIdError.assert(id === req.body._id, "Wrong id in body request");

        Form.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant update form with id ${id}!`);

                return Object.assign(result, req.body).save();
            })
            .then(saved => res.send(saved))
            .catch(next);
    });

router.delete(
    "/:id/",
    permissionCheck(FORM, DELETE),
    (req, res, next) => {
        const {params: {id}} = req;

        Form.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant delete form with id ${id}!`);

                return result.delete();
            })
            .then(() => res.send(true))
            .catch(next);
    });

module.exports = router;
