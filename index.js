const Product = require("./Product");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { router: authRoutes, authenticateJWT } = require("./auth");
const cartRouter = require("./cart");
const Product = require("./models/Product");

app.use(authRoutes);
app.use(cartRouter);

mongoose.connect(
  "mongodb+srv://vijayasre284:cbQOptn5ssEW5blW@cluster0.xnlfpxl.mongodb.net/ecommerce",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "There is an internal server error" });
  }
});

// Get single product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "The item you were searching for doesn't exist" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
