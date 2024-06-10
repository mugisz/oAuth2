const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const accountRoutes = require("./routes/account");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const jwtSecret = process.env.JWT_SECRET;

app.post("/oauth/token", (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication
  if (username === "user" && password === "password") {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
    return res.json({ access_token: token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

// Apply verifyJWT middleware to all /api/account routes
app.use("/api/account", verifyJWT, accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
