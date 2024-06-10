const express = require("express");
const router = express.Router();

router.post("/token", (req, res) => {
  const { username, password } = req.body;
  // Жорстко закодовані облікові дані для перевірки
  if (username === "user" && password === "password") {
    res.json({ access_token: "fake-token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
