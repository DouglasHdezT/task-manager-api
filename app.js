const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require("@internal/config/mongoose");
const cors = require("cors");

const apiRouter = require("@internal/routes/api.router");

const app = express();

database.connect();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

module.exports = app;