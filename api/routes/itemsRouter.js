const express = require("express");
const Db = require("../../data/db");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.json(Db.getAll());
});

router.get("/:id", (req, res, next) => {
    const key = parseInt(req.params.id);
    if (!Db.itemExists(key)) return next(`key does not exist in db: ${key}`);
    res.json(Db.get(key));
});

router.post("/", (req, res, next) => {
    if (!req.body || !req.body.name)
        return res.status(400).send({ message: "missing post data { name: 'your item here' }" });

    //
    Db.add(req.body)
    res.json([...Db.getAll()].reverse()[0]);
});

router.delete("/:id", (req, res, next) => {
    const key = parseInt(req.params.id);
    if (!Db.itemExists(key)) return next(`key does not exist in db: ${key}`);
    res.json(Db.remove(key)[0]);
});

module.exports = router;
