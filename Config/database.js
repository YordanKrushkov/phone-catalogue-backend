require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log(`DB error:`, err);
            return;
        }
        console.log(`You are connected to the DB`);
    })
};