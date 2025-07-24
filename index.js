const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { router: authRoutes, authenticateJWT } = require("./auth");
const cartRouter = require("./cart");
app.use(authRoutes);
app.use(cartRoutes);

mongoose.connect(
  "mongodb+srv://vijayasre284:cbQOptn5ssEW5blW@cluster0.xnlfpxl.mongodb.net/ecommerce",
  { useNewUrlparser: true, useUnifiedtopology: true }
);

app.get("/products", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "there is an internal server error" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "the item you were searching doesn't exist" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
