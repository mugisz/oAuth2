const express = require("express");
const {
  getAccount,
  updateAccount,
} = require("../controller/accountController");

const router = express.Router();

router.get("/:id", getAccount);
router.put("/:id", updateAccount);

module.exports = router;
