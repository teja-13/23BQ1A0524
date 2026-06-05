"use strict";

const axios = require("axios");
const {
  STACK_VALUES,
  LEVEL_VALUES,
  BACKEND_PACKAGES
} = require("../config/constants");

// Build a normalized error response so callers can handle failures uniformly.
function buildErrorResponse(message, details) {
  return {
    success: false,
    error: message,
    details: details || null
  };
}

// Validate and normalize the log payload before contacting the API.
function validateInputs(stack, level, packageName, message) {
  if (!STACK_VALUES.includes(stack)) {
    return buildErrorResponse(
      "Invalid stack value.",
      `Allowed values: ${STACK_VALUES.join(", ")}`
    );
  }

  if (!LEVEL_VALUES.includes(level)) {
    return buildErrorResponse(
      "Invalid level value.",
      `Allowed values: ${LEVEL_VALUES.join(", ")}`
    );
  }

  if (stack === "backend" && !BACKEND_PACKAGES.includes(packageName)) {
    return buildErrorResponse(
      "Invalid backend package.",
      `Allowed values: ${BACKEND_PACKAGES.join(", ")}`
    );
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return buildErrorResponse("Message must be a non-empty string.");
  }

  return { success: true };
}

// Reusable logging function that posts to an external logging API.
async function Log(stack, level, packageName, message) {
  const validation = validateInputs(stack, level, packageName, message);
  if (!validation.success) {
    return validation;
  }

  const payload = {
    stack,
    level,
    package: packageName,
    message
  };

  const apiUrl = process.env.LOG_API_URL;
  const apiToken = process.env.LOG_API_TOKEN;
  const timeoutMs = Number(process.env.LOG_API_TIMEOUT_MS || 4000);

  if (!apiUrl) {
    return buildErrorResponse("LOG_API_URL is not configured.");
  }

  try {
    const headers = {
      "Content-Type": "application/json"
    };

    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`;
    }

    const response = await axios.post(apiUrl, payload, {
      timeout: timeoutMs,
      headers
    });
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Map Axios errors into a consistent response without throwing.
    const status = error.response ? error.response.status : null;
    const data = error.response ? error.response.data : null;
    console.error("Logging API error body:", JSON.stringify(data, null, 2));
    return buildErrorResponse("Logging API request failed.", {
      status,
      data,
      message: error.message
    });
  }
}

module.exports = {
  Log
};
