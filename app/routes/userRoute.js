const express = require("express");
const authenticate = require("../middlewares/auth-middleware");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.use(authenticate);
router.get("/", userController.getUser);
router.post("/change-password", userController.changePassword);

module.exports = router;
