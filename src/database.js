const mongoose = require('mongoose');
const {mongodb} = require('./keys');
mongoose.connect(mongodb.URI,{useNewUrlParser: true})
    .then(db => console.log('Connected to database'))
    .catch(err => console.log(err));