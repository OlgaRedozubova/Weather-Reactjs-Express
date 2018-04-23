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
// const mongoUri = require("./config/consts").mongoUri;
// //db
// const mongoose = require('mongoose');
// mongoose.connect(mongoUri);

// const Schema = mongoose.Schema;
//
// const UsersSchema = new Schema({
//     id     : { type: String, required: true },
//     name      : { type: String},
//     password     : { type: String },
//     towns : { type: String }
// });

//const Users = mongoose.model('Users', UsersSchema);

server.use(bodyParser.json());
server.use(auth.initialize());

server.use('/api/weather', apiWeather);
server.use('/api/auth', apiAuth);
server.use('/api/users', apiUsers);


server.listen(port, () => console.log(`Listening on port ${port}`));


