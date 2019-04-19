const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
    name: String,
    info: String,
    address: {
        address: String,
        city: String
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Business', businessSchema);