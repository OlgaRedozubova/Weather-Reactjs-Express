const express = require('express');
const router = express.Router();

const fs = require('fs');

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.route('/')
    .get((req, res) => {
        console.log('USERS_GET');
        const content = fs.readFileSync("users.json", "utf8");
        const users = JSON.parse(content);
        res.send(users)
    })
    .post(jsonParser, (req, res) => {
            if (!req.body) return res.sendStatus(400);
            console.log('S_req.body', req.body);

            const user = {
                id: 5,
                name: req.body.username,
                towns:'Lviv'
            };

            console.log('user', user);
            // req.body;//{name: townName};

            fs.readFile("users.json", "utf8", function(err, file){
                if(!err){
                    const users = JSON.parse(file);
                    users.push(user);
                    const newFile = JSON.stringify(users);
                    fs.writeFile("users.json", newFile, function (err) {
                        if (!err) {
                            const users = JSON.parse(newFile);
                            res.send(users)
                        }
                    })
                }
            })
        }
    )
    .put((req, res) => {
        console.log('USERS_PUT');
        res.send('<p>USERS_PUT</p>');
    })
    .delete(jsonParser, (req,res) => {
            if (!req.body) return res.setStatus(400);
            const user = req.body.user;
            console.log('user', user);
            fs.readFile("users.json", "utf8", function(err, file){
                if(!err){
                    const users = JSON.parse(file);
                    const newArr = [];
                    //-----------------------------
                    for (key in users) {
                        if (users[key].name.toUpperCase() !== user.name.toUpperCase()) {
                            newArr.push(users[key]);
                        }
                    }
                    //-----------------------------
                    const newFile = JSON.stringify(newArr);
                    fs.writeFile("users.json", newFile, function (err) {
                        if (!err) {
                            const users = JSON.parse(newFile);
                            res.send(users);
                        }
                    });
                }
            });
        }
    );

module.exports = router;