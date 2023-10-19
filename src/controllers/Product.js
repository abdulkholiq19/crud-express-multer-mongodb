const Product = require('../models/ProductModels')
const asyncHandler = require('express-async-handler')
const { unlink } = require('node:fs/promises');
const fs = require('fs-extra')

exports.getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
    res.send({
      status: "success",
      message: "Success Get Data Products",
      data: {
        results: products.length,
        products
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
})

exports.getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.send({
      status: "success",
      message: `Success Get Data Product With Id ${id}`,
      data:
        product

    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
})


exports.addProduct = asyncHandler(async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file.filename
    }
    const product = await Product.create(data)
    res.send({
      status: "success",
      message: `Success Create New Product`,
      data: {
        newData: product
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
})

exports.editProduct = asyncHandler(async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file.filename
    }
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, data);
    if (!product) {
      return res.status(404).json({ message: `cannot find any product with ID ${id}` })
    }
    const updatedProduct = await Product.findById(id);
    res.send({
      status: "success",
      message: `Success Update Product With ID : ${id}`,
      data:
        updatedProduct
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
})


exports.deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const productList = await Product.find()

    fs.readdir('uploads', (err, files) => {
      const array1 = files.filter(val => {
        return !productList.map(item => item.image).includes(val)
      });
      return array1.forEach((el) => unlink(`uploads\\${el}`))
    });
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
    }
    res.send({
      status: "success",
      message: `Success Delete Product`,
      data: {
        id: id
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
})