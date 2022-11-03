// load up the express framework and body-parser helper
const express = require('express');
const parser = require('body-parser');
const config = require('./config');

// create an instance of express to serve our end points
const app = express();

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js');

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(parser.json());

// Define middlewares (aka addons/config) for our app
app.set('views', config.app.viewsDir);
app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: false}));
app.use(express.static(config.app.staticDir));

app.use(routes);

// finally, launch our server
const server = app.listen(config.server.port, config.server.host, () => {
  console.log(`server is listening on ${config.server.host}:${config.server.port}`);
});