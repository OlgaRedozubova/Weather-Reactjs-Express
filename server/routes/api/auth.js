const express = require('express');
const router = express.Router();

const jwt = require("jwt-simple");
const auth = require("../../auth.js")(); //passport/ passport-jwt
//const users = require("../../db/users.js"); //users
const config = require("../../config/config.js");
//db
const db = require('../../db/DataBaseUtils');



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
        if (req.body.name && req.body.password) {
            const userName = req.body.name;
            const password = req.body.password;
            db.setUpConnection();
            db.findUserByName(userName, password).then(
                user => {
                    if (user && user.length > 0) {
                        var payload = {
                            id: user[0]._id
                        };
                        console.log('id', payload.id);
                        var token = jwt.encode(payload, config.jwtSecret);
                        res.json({
                            token: token,
                            username: user[0].name
                        });
                    } else {
                        console.log('res.sendStatus(401)');
                        res.status(401).json({message: "Login not found"});
                    }
                   // console.log('find',user[0], user[0].id);
                }
            );
    } else {
        console.log('res.sendStatus(401)');
        res.sendStatus(401);
    }
});

module.exports = router;