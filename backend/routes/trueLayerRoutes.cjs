const express = require("express");
const { getUserData } = require("../services/trueLayerService.cjs"); // Import service function
const router = express.Router();

router.post("/get-user-data", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const data = await getUserData(accessToken);
    res.json(data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

module.exports = router;
