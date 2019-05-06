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
    },
    events: [{
        title: String,
        description: String,
        date: {
            from: Date,
            to: Date,
        },
    }]
});

module.exports = mongoose.model('Business', businessSchema);