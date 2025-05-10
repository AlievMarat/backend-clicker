const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
app.use(express.json());
const upgrades = [
  {
    id: 1,
    name: "Click Accelerator",
    description: "speed of earning x10",
    price: 40000,
  },
  {
    id: 2,
    name: "Coin Multiplayer",
    description: "ClickCoins per click x10",
    price: 40000,
  },
  {
    id: 3,
    name: "Power Tap",
    description: "ClickCoins per click x2",
    price: 10000,
  },
  {
    id: 4,
    name: "Golden Touch",
    description: "random bonus on click",
    price: 40000,
  },
  {
    id: 5,
    name: "Click Accelerator",
    description: "passive income x10",
    price: 40000,
  },
  {
    id: 6,
    name: "Mining Drone",
    description: "automated clicks for 1 min",
    price: 100000,
  },
];
router.get("//:id", (req, res) => {
  return res.status(200).json({
    message: "OK",
    upgrades: upgrades,
  });
});
router.get("//:id/:id", (req, res) => {
  const { id } = req.params;
  const specificUpgrade = upgrades.find((upgrade) => upgrade.id === id);
  return res.json(200).send({
    message: "OK",
    upgrade: specificUpgrade,
  });
});
router.post("/:id", (req, res) => {
  const upgrade = req.body;
  upgrades.push(upgrade);
  return res.status(201).send({
    message: "Created",
  });
});
router.put("/:id/:id", (req, res) => {
  const { id } = req.params;
  const putUpgrade = req.body;
  const changeUpgrade = upgrades.findIndex((upgrade) => upgrade.id === id);
  if (changeUpgrade !== -1) {
    upgrades[changeUpgrade] = putUpgrade;
    return res.json(201).send({
      message: "Created",
    });
  } else {
    return res.json(404).send({
      message: "Not Found",
    });
  }
});
router.delete("/:id/:id", (req, res) => {
  const { id } = req.params;
  const specificUpgrade = upgrades.find((upgrade) => upgrade.id === id);
  return res.json(204).send({
    message: "No Content",
  });
});
module.exports = router;
