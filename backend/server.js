const express = require('express');
const cors = require('cors');
require('dotenv').config('./.env');
require('./db');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//routes
const UserRoutes = require('./routes/user-routes.js');
app.use(UserRoutes);

const ProductsRoutes = require('./routes/products-routes.js');
app.use(ProductsRoutes);

const imageRoutes = require('./routes/uploadImage-routes.js');
app.use(imageRoutes);

const cartRoutes = require('./routes/cart-routes.js');
app.use(cartRoutes);

const wishlistRoutes = require('./routes/wishlist-routes');
app.use(wishlistRoutes);

const orderRoutes = require('./routes/order-routes.js');
app.use(orderRoutes);

app.listen(8000, () => {
  console.log('App is running @ http://localhost:8000');
});
