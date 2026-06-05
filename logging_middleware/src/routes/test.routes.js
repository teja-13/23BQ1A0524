"use strict";

const express = require("express");

const router = express.Router();

// Sample success route.
router.get("/success", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Request completed successfully."
  });
});

// Sample error route to simulate a failure response.
router.get("/error", (req, res) => {
  res.status(500).json({
    ok: false,
    message: "Simulated error response."
  });
});

module.exports = router;
