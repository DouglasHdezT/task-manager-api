const express = require("express");
const router = express.Router();

const taskRouter = require("./task.router");

router.use("/task", taskRouter);

module.exports = router;