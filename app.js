const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Set the port
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(middleware);

// Routes
app.get('/products/:id', api.getProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);
app.post('/products', api.createProduct);

app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);
app.put('/orders/:id', api.editOrder);
app.delete('/orders/:id', api.deleteOrder);

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`));