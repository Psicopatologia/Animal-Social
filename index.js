const express = require('express');
const app = express();
const routes = require('./routes/index')

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs')


// Routes
app.use(routes);

// Static files
app.use(express.static('public'));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')} :D`)
})