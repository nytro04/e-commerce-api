const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

// Routes Handlers

// get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  // execute query
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  // send response
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products
    }
  });
});

// get single Product
exports.getProduct = catchAsync(async (req, res, next) => {
  // const product = await Product.findById({_id: req.params.id})
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with ID", 404));
  }

  //send respond if product was found
  res.status(200).json({
    status: "success",
    data: {
      product
    }
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // const newProduct = new Product({})
  // newProduct.save()

  const newProduct = await Product.create(req.body);

  // send respond
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct
    }
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product
    }
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});

