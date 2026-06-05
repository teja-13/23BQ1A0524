"use strict";

const { Log } = require("../services/logService");

// Express middleware that records inbound requests to the logging API.
async function requestLogger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const ipAddress = req.ip;
  const timestamp = new Date().toISOString();

  // Keep the message within the API limit (<= 48 chars).
  let message = `HTTP ${method} ${url} ${ipAddress} ${timestamp}`;
  if (message.length > 48) {
    message = message.slice(0, 48);
  }
  const packageName = process.env.DEFAULT_BACKEND_PACKAGE || "route";

  const result = await Log("backend", "info", packageName, message);

  if (!result.success) {
    // Fallback to console when the logging API is unavailable.
    console.warn("Request log failed:", result);
  }

  next();
}

module.exports = {
  requestLogger
};
