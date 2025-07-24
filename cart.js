const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Cart = mongoose.model(
  "cart",
  new mongoose.schema({
    userId: String,
    items: [
      {
        productId: String,
        quantity: Number,
      },
    ],
  })
);
router.post("/card/add", async (req, res) => {
  try {
    const { productId, quantity = 1, user } = req.body;

    if (!productId || !user) {
      return res.status(400).json({ message: "productid and user required" });
    }

    let cart = await Cart.findOne({ userid: user, status: "active" });

    if (!cart) {
      cart = new Cart({ userId: user, items: [], status: "active" });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => items.productId == productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += parseInt(quantity);
    } else {
      cart.items.push({
        productId,
        quantity: parseInt(quantity),
      });
    }
    cart.updateAt = new Date();
    await cart.save();
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error,item has not been added" });
  }
});

router.get("carts", async (req, res) => {
  try {
    const carts = await Cart.find({});

    res.status(200).json({
      success: true,
      count: cart.length,
      data: carts,
    });
  } catch (err) {
    console.log("error fetching the cart", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch data",
      error: error.message,
    });
  }
});

//delete router

router.delete("/cart/:id", async (req, res) => {
  //check if item is there in cart - do delete operation,
  //if item is not there - err to user
});

module.exports = router;
