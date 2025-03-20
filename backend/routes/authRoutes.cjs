
const express = require("express");
const {
  getToken,
  register,
  login,
  authenticate,
} = require("../controller/authController.cjs");

const router = express.Router();

router.route("/get-token").post(getToken);

router.post("/register", register);
router.post("/login", login);

router.get("/protected", authenticate, async (req, res) => {
  // Protected route logic here
});

module.exports = router;
