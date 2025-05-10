const express = require("express");
const router = express.Router();
const userBalance = {
  balance: 0,
  coinsPerClick: 1,
  passiveIncomePerSecond: 1,
};
router.post("/click/:id", (req, res) => {
  userBalance.balance += userBalance.coinsPerClick;
  res.json({
    message: "OK",
    balance: userBalance.balance,
  });
});
router.post("/passiveIncomePerSecond/:id", (req, res) => {
  userBalance.balance += userBalance.passiveIncomePerSecond;
  res.json({
    message: "OK",
    balance: userBalance.balance,
  });
});
module.exports = router;
