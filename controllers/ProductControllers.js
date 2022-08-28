const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer");

const path = require("path");
const fs = require("fs");

const Product = require("../models/product")
const app = express()




const storage = multer.diskStorage({
  destination: "./assets/images/product",

  filename: function (req, file, cb) {
    let name = req.body.name.replace(" ", "").toLowerCase();

    cb(null, name + "-" + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype == true && extname == true) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

app.post("/", [upload.single("picture")], async (req, res) => {
  console.log('here object to add', req.body);
  try {
    let data = req.body;
    let file = req.file;

    let product = new Product({
      name: data.name,
      serie: Number(data.serie),
      prix: data.prix,
      cat: data.cat,
      picture: file.filename,

    });

    await product.save();

    res.status(201).send({ message: "product saved !" });
  } catch (error) {
    res.status(400).send({ message: "product not saved !", error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    let product = await Product.find();
    res.status(200).send(product);
  } catch (error) {
    res
      .status(400)
      .send({ message: "error fetching product !", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let productId = req.params.id;

    let product = await Category.findOne({ _id: productId });

    if (product) res.status(200).send(product);
    else res.status(404).send({ message: "product not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching product !", error: error });
  }
});

app.patch("/:id", [upload.single("picture")], async (req, res) => {
  try {
    let productId = req.params.id;
    let data = req.body;


    if (req.file) {
      data.image = req.file.filename;
      let product = await Product.findOne({ _id: productId });
      fs.unlinkSync("assets/images/product/" + product.image);
    }

    let updatedproduct = await Product.findOneAndUpdate(
      { _id: productId },
      data
    );

    if (updatedProduct)
      res.status(200).send({ message: "product updated !" });
    else res.status(404).send({ message: "product not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating product !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await Product.findOneAndDelete({ _id: productId });

    if (product)
      res.status(200).send({ message: "product Deleted !" });
    else res.status(404).send({ message: "product not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting product !", error: error });
  }
});

module.exports = app;
