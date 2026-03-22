const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @desc    Show form to create a product
// @route   GET /api/products/new (frontend only)
// @access  Public

// showCreateForm removed (frontend concern)

// @desc   Create new product
// @route   POST /products (frontend only)
// @access  Public
exports.createProduct = async (req, res) => {
  try {
    let { name, price, description, imageUrl } = req.body;

    // Handle empty image URL to trigger Mongoose default
    if (!imageUrl || imageUrl.trim() === "") {
      imageUrl = undefined;
    }

    //Create product in stripe
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    });
    //Create price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100),
      currency: "usd",
    });
    //Create a product in database
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    });
    console.log(product);

    //Return JSON for frontend
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error creating product",
    });
  }
};

//  @desc    Get all Products
//  @route   GET/products (frontend only)
//  @access  Public

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort("-createdAt");
    //Return JSON for frontend
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error Loading products",
    });
  }
};

//  @desc    Get a Product
// @route   GET/products/:id (frontend only)
//  @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error Loading product",
    });
  }
};
// @desc    Update a Product
// @route   PUT /api/products/:id
// @access  Public
exports.updateProduct = async (req, res) => {
  try {
    let { name, price, description, imageUrl } = req.body;

    // Handle empty image URL
    if (imageUrl === "") {
      imageUrl = undefined;
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Update in MongoDB
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.imageUrl = imageUrl || product.imageUrl;

    await product.save();

    // Optionally update Stripe product info (name/description)
    try {
      await stripe.products.update(product.stripeProductId, {
        name: product.name,
        description: product.description,
        images: product.imageUrl ? [product.imageUrl] : undefined,
      });
    } catch (stripeErr) {
      console.warn("Stripe product update failed:", stripeErr.message);
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      error: "Error updating product",
    });
  }
};

// @desc    Delete a Product
// @route   DELETE /api/products/:id
// @access  Public
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Deactivate in Stripe instead of full delete to preserve history
    try {
      await stripe.products.update(product.stripeProductId, { active: false });
    } catch (stripeErr) {
      console.warn("Stripe product deactivation failed:", stripeErr.message);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      error: "Error deleting product",
    });
  }
};
