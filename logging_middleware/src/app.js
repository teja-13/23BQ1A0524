"use strict";

const express = require("express");
const { requestLogger } = require("./middleware/logger");
const testRoutes = require("./routes/test.routes");

const app = express();

// Parse JSON bodies for routes that may accept data later.
app.use(express.json());

// Attach request logging middleware for all incoming requests.
app.use(requestLogger);

// Register sample routes.
app.use(testRoutes);

module.exports = app;
