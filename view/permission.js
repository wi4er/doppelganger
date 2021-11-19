const {Router} = require("express");
const router = Router();
const permissionQuery = require("../query/permissionQuery");
const Permission = require("../model/Permission");
const {WrongIdError} = require("../exception/WrongIdError");
const {checkMethod} = require("../permission/methodPermission");
const {PERMISSION} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");

router.get("/", (req, res, next) => {
    checkMethod(PERMISSION, GET, req.user)
        .then(() => Permission.find(
            permissionQuery.parseFilter(req.query.filter)
        ))
        .then(result => res.send(result))
        .catch(next);
});

router.get("/:id/", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(PERMISSION, GET, req.user)
        .then(() => Permission.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant find permission with id ${id}!`);

            res.send(result);
        })
        .catch(next);
});

router.post("/", (req, res, next) => {
    checkMethod(PERMISSION, POST, req.user)
        .then(() => new Permission(req.body).save())
        .then(result => {
            res.status(201);
            res.send(result);
        })
        .catch(next);
});

router.put("/:id", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(PERMISSION, PUT, req.user)
        .then(() => Permission.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant update permission with id ${id}!`);

            return Object.assign(result, req.body).save();
        })
        .then(saved => res.send(saved))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    const {params: {id}} = req;

    checkMethod(PERMISSION, DELETE, req.user)
        .then(() => Permission.findById(id))
        .then(result => {
            WrongIdError.assert(result, `Cant delete permission with id ${id}!`);

            return result.delete();
        })
        .then(() => res.send(true))
        .catch(next);
});

module.exports = router;
