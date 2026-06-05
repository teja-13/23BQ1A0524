const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const schedulerController =
    require("../controllers/scheduleController.js");

router.get(
    "/:depotId",
    authMiddleware,
    schedulerController.getSchedule
);

module.exports = router;