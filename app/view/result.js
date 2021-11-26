const {Router} = require("express");
const router = Router();
const Result = require("../model/Result");
const WrongIdError = require("../exception/WrongIdError");
const resultQuery = require("../query/resultQuery");
const {RESULT} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");
const permissionCheck = require("../permission/check");

router.get(
    "/",
    permissionCheck(RESULT, GET),
    (req, res, next) => {
        Result.find(
            resultQuery.parseFilter(req.query.filter)
        )
            .then(result => res.send(result))
            .catch(next);
    });

router.get(
    "/:id/",
    permissionCheck(RESULT, GET),
    (req, res, next) => {
        const {params: {id}} = req;

        Result.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant find result with id ${id}!`);

                res.send(result);
            })
            .catch(next);
    });

router.post(
    "/",
    permissionCheck(RESULT, POST),
    (req, res, next) => {
        new Result(req.body).save()
            .then(result => {
                res.status(201);
                res.send(result);
            })
            .catch(next);
    });

router.put(
    "/:id/",
    permissionCheck(RESULT, PUT),
    (req, res, next) => {
        const {params: {id}} = req;

        WrongIdError.assert(id === req.body._id, "Wrong id in body request");

        Result.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant update result with id ${id}!`);

                return Object.assign(result, req.body).save();
            })
            .then(saved => res.send(saved))
            .catch(next);
    });

router.delete(
    "/:id/",
    permissionCheck(RESULT, DELETE),
    (req, res, next) => {
        const {params: {id}} = req;

        Result.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant delete result with id ${id}!`);

                return result.delete();
            })
            .then(() => res.send(true))
            .catch(next);
    });

module.exports = router;
