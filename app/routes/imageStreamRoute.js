const express = require("express");
const router = express.Router();
const imageStreamController = require("../controllers/imageStream.controller");

router.get("/:filename", imageStreamController.imageStream);

module.exports = router;
