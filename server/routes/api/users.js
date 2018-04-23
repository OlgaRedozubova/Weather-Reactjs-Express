const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const db = require('../../db/DataBaseUtils');

db.setUpConnection();

router.route('/')
    .get((req, res) => {
        db.listUsers().then(data => res.send(data));
    })
    .post(jsonParser, (req, res) => {
             if (!req.body) return res.sendStatus(400);
             console.log('S_req.body', req.body);

             const user = {
                 id: "5",
                 name: req.body.username,
                 password: 'test',
                 towns: 'Lviv'
             };
             console.log('user',user);
        db.createUser(user).then(
            data => { db.listUsers().then(data => res.send(data));
                // console.log('data', data);
                // res.send(data);
            }
        );
        }
    )
    .put((req, res) => {
        console.log('USERS_PUT');
        res.send('<p>USERS_PUT</p>');
    })
    .delete(jsonParser, (req,res) => {
            if (!req.body) return res.setStatus(400);
            //const user = req.body.user;
            console.log('req.body.user', req.body.user);
            db.deleteUser(req.body.user._id).then(
                 data => { db.listUsers().then(data => res.send(data));}
            //     //res.send(data)
             );
        }
    );

module.exports = router;