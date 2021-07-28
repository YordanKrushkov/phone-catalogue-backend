require('dotenv').config();
const express = require('express');
const app = express();
const products = require('./Routes/products');
const users = require('./Routes/users');
const db = require('./Config/database');
let port = process.env.PORT || 4500

require('./Config/express')(app);
app.use('/phones', products)
app.use('/user', users)
app.listen(port, (err) => {

    if (err) {
        console.log("Problem with the connection:", err);
        return;
    }
    db()
    console.log(`Server is listening on port ${port}`);
})