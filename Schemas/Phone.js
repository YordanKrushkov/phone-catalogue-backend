const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String },
    color: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
    screen: { type: String },
    processor: { type: String },
    ram: { type: String },
    memory: { type: String },
});

const Phone = mongoose.model('Phone', PhoneSchema);
module.exports = Phone;