const path = require('path');
const Products = require('./products');
const Orders = require('./orders'); // Assuming you have an Orders module
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List products with pagination and optional filtering by tag
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag,
  });
  res.json(products);
}

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) {
    return next(); // Pass control to the next handler
  }
  res.json(product);
}

/**
 * Create a product
 * @param {object} req
 * @param {object} res
 */
async function createProduct(req, res) {
  console.log('request body:', req.body);
  const product = await Products.create(req.body);
  res.json(product);
}

/**
 * Edit an existing product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  const change = req.body;
  try {
    const product = await Products.edit(req.params.id, change);
    res.json(product);
  } catch (error) {
    next(error); // Pass error to error handler
  }
}

/**
 * Delete a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function deleteProduct(req, res, next) {
  try {
    const response = await Products.destroy(req.params.id);
    res.json(response);
  } catch (error) {
    next(error); // Pass error to error handler
  }
}

/**
 * Create an order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function createOrder(req, res, next) {
  try {
    const order = await Orders.create(req.body);
    res.json(order);
  } catch (error) {
    next(error); // Pass error to error handler
  }
}

/**
 * List orders with pagination and optional filtering by product ID and status
 * @param {object} req
 * @param {object} res
 */
async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  });
  res.json(orders);
}

/**
 * Edit an existing order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editOrder(req, res, next) {
  const change = req.body;
  try {
    const order = await Orders.edit(req.params.id, change);
    res.json(order);
  } catch (error) {
    next(error); // Pass error to error handler
  }
}

/**
 * Delete an order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error); // Pass error to error handler
  }
}

// Export all the routes using autoCatch
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder,
});
