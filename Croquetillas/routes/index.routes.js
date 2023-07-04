const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRoutes = require ("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const productRoutes = require("./product.routes")
router.use("/product", productRoutes)

module.exports = router;
