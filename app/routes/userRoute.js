const express = require("express");
const authenticate = require("../middlewares/auth-middleware");
const userController = require("../controllers/user.controller");
const upload = require("../multer");
const router = express.Router();

router.use(authenticate);
router.get("/", userController.getUser);
router.post("/change-password", userController.changePassword);
router.post(
  "/upload/image",
  upload.single("image"),
  userController.imageUpload
);

module.exports = router;
