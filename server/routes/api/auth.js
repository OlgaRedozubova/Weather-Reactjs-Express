const express = require('express');
const router = express.Router();

const jwt = require("jwt-simple");
const auth = require("../../auth.js")(); //passport/ passport-jwt
const users = require("../../db/users.js"); //users
const config = require("../../config/config.js");

router.route("/secret")
    .get(auth.authenticate(), function(req, res) {
    console.log('server-users', users);
    for (key in users) {
        if (users[key].id === req.user.id) {
            console.log('users[key]', users[key]);
            res.json(users[key]);
        }
    }
    //console.log('server-req-user', req.user);
//    res.json(users[req.user.id]);
});

//возвращает token и id user
router.route("/token")
    .post(function(req, res) {
    console.log('Server, token');
    if (req.body.name && req.body.password) {
        var userName = req.body.name;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.name === userName && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            console.log('id', payload.id);
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token,
                username: user.name
            });
        } else {
            console.log('res.sendStatus(401)');
            res.status(401).json({message: "passwords did not match"});
            //   res.sendStatus(401);
        }
    } else {
        console.log('res.sendStatus(401)');
        res.sendStatus(401);
    }
});

module.exports = router;