"use strict";

require("dotenv").config();

const requiredVars = [
  "AUTH_API_URL",
  "DEPOTS_API_URL",
  "VEHICLES_API_URL",
  "LOG_API_URL"
];

for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

module.exports = {
  PORT: Number(process.env.PORT || 3000),
  AUTH_API_URL: process.env.AUTH_API_URL,
  DEPOTS_API_URL: process.env.DEPOTS_API_URL,
  VEHICLES_API_URL: process.env.VEHICLES_API_URL,
  LOG_API_URL: process.env.LOG_API_URL,
  LOG_API_TIMEOUT_MS: Number(process.env.LOG_API_TIMEOUT_MS || 10000),
  LOG_API_TOKEN: process.env.LOG_API_TOKEN || ""
};