const express = require("express");
const router = express.Router();

router.post("login", async (Req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
