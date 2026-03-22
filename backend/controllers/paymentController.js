const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Customer = require("../models/Customer");
const Payment = require("../models/Payment");
const Product = require("../models/Product");

// @desc    Show checkout page for a product
// @route   GET /checkout/:productId (frontend only)
// @access  Public
exports.showCheckout = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json({
      success: true,
      data: {
        product,
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error Loading Checkout",
    });
  }
};

// @desc    Process checkout
// @route   POST /checkout/:productId (frontend only)
// @access  Public
exports.processCheckout = async (req, res) => {
  try {
    const { name, email } = req.body;
    const productId = req.params.productId;

    //Find or create customer
    let customer = await Customer.findOne({ email });
    if (!customer) {
      //Create a customer in stripe
      const stripeCustomer = await stripe.customers.create({
        name,
        email,
      });
      //Create customer in database
      customer = await Customer.create({
        name,
        email,
        stripeCustomerId: stripeCustomer.id,
      });
    }

    //Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    //Create a PaymentIntent in Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(product.price * 100),
      currency: "usd",
      customer: customer.stripeCustomerId,
      description: product.name,
      metadata: { productId: product._id.toString() },
    });

    //Save a pending Payment record in DB
    await Payment.create({
      customer: customer._id,
      stripePaymentIntentId: paymentIntent.id,
      amount: product.price,
      currency: "usd",
      status: "pending",
      description: product.name,
    });

    //Return JSON for frontend
    res.status(200).json({
      success: true,
      data: {
        title: "Complete Payment",
        product,
        clientSecret: paymentIntent.client_secret,
        customer,
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      }
    });
  } catch (error) {
    console.error("Error Processing Checkout:", error);
    res.status(500).json({
      success: false,
      error: "Error Processing Checkout",
    });
  }
};

// @desc    Show payment success page
// @route   GET /payment/success (frontend only)
// @access  Public
exports.paymentSuccess = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment Successful",
  });
};

// @desc     Show all payments page
// @route   GET /payments (frontend only)
// @access  Public
exports.showAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("customer", "name email")
      .sort("-createdAt");
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error Loading Payments",
    });
  }
};

// @desc    Manual payment status update
// @route   POST /api/payments/update/:paymentIntentId
// @access  Public
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const { status } = req.body;

    const payment = await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntentId },
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, error: "Payment not found" });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error Updating Payment Status:", error);
    res.status(500).json({ success: false, error: "Error Updating Payment Status" });
  }
};
