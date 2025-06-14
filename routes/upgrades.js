// backend/routes/upgrade.js
const express = require("express");
const router = express.Router();
const userBalance = require("../balance"); // файл з даними користувачів

const upgrades = [
  {
    id: "click-accelerator",
    name: "Click Accelerator",
    price: 40000,
    type: "multiplyClick",
    value: 10,
  },
  {
    id: "coin-multiplier",
    name: "Coin Multiplier",
    price: 25000,
    type: "addClick",
    value: 5,
  },
  {
    id: "passive-boost",
    name: "Passive Boost",
    price: 30000,
    type: "multiplyPassive",
    value: 2,
  },
  {
    id: "passive-small",
    name: "Passive Small Bonus",
    price: 10000,
    type: "addPassive",
    value: 3,
  },
];
router.post("/buy-upgrade/:id", (req, res) => {
  const upgradeId = Number(req.params.id);
  const upgrade = upgrades.find((u) => u.id === upgradeId);
  if (!upgrade) {
    return res.status(404).json({ message: "Upgrade not found" });
  }

  if (userBalance.balance < upgrade.price) {
    return res.status(400).json({ message: "Недостатньо коштів" });
  }

  // списываем цену
  userBalance.balance -= upgrade.price;

  // применяем эффект к userBalance
  switch (upgrade.type) {
    case "multiplyClick":
      userBalance.coinsPerClick *= upgrade.value;
      break;
    case "addClick":
      userBalance.coinsPerClick += upgrade.value;
      break;
    case "multiplyPassive":
      userBalance.passiveIncomePerSecond *= upgrade.value;
      break;
    case "addPassive":
      userBalance.passiveIncomePerSecond += upgrade.value;
      break;
    default:
      return res.status(409).json({ message: "Невірний тип ефекту" });
  }

  return res.status(200).json({
    message: "Успішна покупка",
    balance: userBalance.balance,
    coinsPerClick: userBalance.coinsPerClick,
    passiveIncomePerSecond: userBalance.passiveIncomePerSecond,
  });
});

module.exports = router;
