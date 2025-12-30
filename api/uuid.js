const express = require("express");
const router = express.Router();

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

function generatePremiumUUID() {
  const part1 = randomString(5);
  const part2 = randomString(4);
  const part3 = randomString(5);
  const part4 = randomString(4);
  const part5 = randomString(6);
  return `YZ-${part1}-${part2}-${part3}-${part4}-${part5}`;
}

router.get("/uuid", (req, res) => {
  res.status(200).json({
    result: generatePremiumUUID(),
    version: "v8",
    timestamp: new Date().toISOString(),
  });
});

const app = express();
app.use("/api", router);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
