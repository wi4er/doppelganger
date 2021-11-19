const {Router} = require("express");
const router = Router();
const Result = require("../model/Result");
const WrongIdError = require("../exception/WrongIdError");
const {checkMethod} = require("../permission/methodPermission");
const resultQuery = require("../query/resultQuery");
const {RESULT} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");

router.get("/", (req, res, next) => {
    checkMethod(RESULT, GET, req.user)
        .then(() => Result.find(
            resultQuery.parseFilter(req.query.filter)
        ))
        .then(result => res.send(result))
        .catch(next);
});

router.get("/:id/", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(RESULT, GET, req.user)
        .then(() => Result.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant find result with id ${id}!`);

            res.send(result);
        })
        .catch(next);
});

router.post("/", (req, res, next) => {
    checkMethod(RESULT, POST, req.user)
        .then(() => new Result(req.body).save())
        .then(result => {
            res.status(201);
            res.send(result);
        })
        .catch(next);
});

router.put("/:id/", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(RESULT, PUT, req.user)
        .then(() => Result.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant update result with id ${id}!`);

            return Object.assign(result, req.body).save();
        })
        .then(saved => res.send(saved))
        .catch(next);
});

router.delete("/:id/", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(RESULT, DELETE, req.user)
        .then(() => Result.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant delete result with id ${id}!`);

            return result.delete();
        })
        .then(() => res.send(true))
        .catch(next);
});

module.exports = router;
