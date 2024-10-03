const express = require("express");
const router = express.Router();

const MenuItems = require("../models/MenuItems");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItems(data);
    const response = await newMenuItem.save();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saving menu item:", error);
    res.status(500).json({ error: "Failed to save menu item" });
  }
});
router.get("/", async (req, res) => {
  try {
    const response = await MenuItems.find({});
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

router.get("/:teste", async function (req, res) {
  try {
    const teste = req.params.teste;

    if (
      teste == "veg" ||
      teste == "non-veg" ||
      teste == "spicy" ||
      teste == "eggs"
    ) {
      const response = await MenuItems.find({ category: teste });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "not valid category" });
    }
  } catch (error) {
    res.status(500).json({ error: "fetch to menu items failed" });
  }
});

module.exports = router;
