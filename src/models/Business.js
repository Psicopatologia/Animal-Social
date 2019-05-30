const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
    name: String,
    info: String,
    address: {
        address: String,
        city: String
    },
    comments: [{
        user: String,
        name: String,
        comment: String
    }],
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
        interested: {
            n: Number,
            ids: [{
                type: String
            }]
        }
    }]
});

module.exports = mongoose.model('Business', businessSchema);