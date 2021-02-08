const express = require("express");
const router = express.Router();

const {
    findAll,
    findOneByID,
    insert, updateText,
    toggleActive,
    deleteOneByID
} = require("@internal/controllers/task.controller");

router.get("/", findAll);
router.get("/:id", findOneByID);

router.post("/", insert);

router.put("/", updateText);
router.put("/toggle/:id", toggleActive);

router.delete("/:id", deleteOneByID);

module.exports = router;