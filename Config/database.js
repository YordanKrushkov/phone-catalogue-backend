const config = require('./config');

const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log(`DB error:`, err);
            return;
        }
        console.log(`You are connected to the DB`);
    })
};