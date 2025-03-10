const express = require("express");
const { getToken } = require("../controller/authController.cjs");

const router = express.Router();

router.route("/get-token").post(getToken);

module.exports = router;
