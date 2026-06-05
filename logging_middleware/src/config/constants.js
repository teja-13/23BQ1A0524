"use strict";

// Centralized constants for the logging service and validation.
const STACK_VALUES = ["backend", "frontend"];

const LEVEL_VALUES = ["debug", "info", "warn", "error", "fatal"];

const BACKEND_PACKAGES = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service"
];

module.exports = {
  STACK_VALUES,
  LEVEL_VALUES,
  BACKEND_PACKAGES
};
