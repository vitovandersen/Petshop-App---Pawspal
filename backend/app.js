const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json()); 
app.use(morgan('tiny'));

//Routers
const cartItemsRouter = require('./routers/cart_items');
const orderDetailRouter = require('./routers/order_detail');
const ordersRouter = require('./routers/orders');
const paymentsRouter = require('./routers/payments');
const productsRouter = require('./routers/products');
const servicesRouter = require('./routers/services');
const shippingRouter = require('./routers/shipping');
const usersRouter = require('./routers/users');

const api = process.env.API_URL;

app.use(`${api}/cart_items`, cartItemsRouter);
app.use(`${api}/order_detail`, orderDetailRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/payments`, paymentsRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/services`, servicesRouter);
app.use(`${api}/shipping`, shippingRouter);
app.use(`${api}/users`, usersRouter);

// Connection ke MongoDB, Driver 
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Connection database is ready.....')
})
.catch((err) => {
    console.log(err);
})


app.listen(3000, ()=> {
    console.log('The server running http://localhost:3000');
})
