const express = require('express');
const routes = require('./routes/index');
const path = require('path'); 

// Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({extended: false}));

// Routes
app.use(routes);

// Static files
app.use(express.static('public'));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')} :D`)
})