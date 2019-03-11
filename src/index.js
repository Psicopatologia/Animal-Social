const express = require('express');
const app = express();
const routes = require('./routes/index')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs')

// Routes
app.use(routes);

// Database conection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'ASdb';

// Conect to mongodb server
MongoClient.connect(url,{ useNewUrlParser: true },(err,client) => {
    assert.equal(null, err);
    console.log("Connected successfully to database server");

    const db = client.db(dbName);

    client.close();
})

// Static files
app.use(express.static('public'));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')} :D`)
})