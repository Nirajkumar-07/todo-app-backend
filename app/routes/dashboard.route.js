const express = require("express");
const authenticate = require("../middlewares/auth-middleware");
const dashboardController = require("../controllers/dashboard.controller");
const router = express.Router();

router.use(authenticate);
router.get("/data", dashboardController.getDashboardData);

module.exports = router;
