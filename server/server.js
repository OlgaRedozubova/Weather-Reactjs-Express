const express = require('express');
const server = express();

const bodyParser = require("body-parser");
//route
const apiWeather = require('./routes/api/weather'); //router
const apiAuth = require('./routes/api/auth'); //router
const apiUsers = require('./routes/api/users'); //router

const auth = require("./auth.js")(); //passport/ passport-jwt
//const
const port = require("./config/consts.js").port;


server.use(bodyParser.json());
server.use(auth.initialize());

server.use('/api/weather', apiWeather);
server.use('/api/auth', apiAuth);
server.use('/api/users', apiUsers);


server.listen(port, () => console.log(`Listening on port ${port}`));


