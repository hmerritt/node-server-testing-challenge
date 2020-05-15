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

router.delete("/:id", (req, res, next) => {
    const key = parseInt(req.params.id);
    if (!Db.itemExists(key)) return next(`key does not exist in db: ${key}`);
    res.json(Db.remove(key)[0]);
});

module.exports = router;
