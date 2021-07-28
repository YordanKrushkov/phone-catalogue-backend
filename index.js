require('dotenv').config();
const express = require('express');
const app = express();
const products = require('./Routes/products');
const config = require('./Config/config');
const users = require('./Routes/users');
const db = require('./Config/database');

require('./Config/express')(app);
app.use('/phones', products)
app.use('/user', users)
app.listen(process.env.PORT||config.port, (err) => {

    if (err) {
        console.log("Problem with the connection:", err);
        return;
    }
    db()
    console.log(`Server is listening on port ${config.port}`);
})