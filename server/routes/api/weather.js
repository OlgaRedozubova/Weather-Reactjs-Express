const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const Promise = require('bluebird');
const rp = require('request-promise');

const uriWeather = require("../../config/consts.js").uriWeather;
const appid = require("../../config/consts.js").appid;

function getWeatherTowns(townsList, req, res) { console.log('getWeatherTowns1')
    const promiseList =[];
    townsList.map((item) => (
        promiseList.push(
            rp({
                uri: uriWeather,
                qs: {
                    q: item.name,
                    appid: appid
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true,
            })
                .then(function(responseData){
                    return responseData;
                })
                .catch(function(err){
                    return res.json(err);
                })
        )
    ));

    Promise.all(promiseList)
        .then(value => {
            return res.json(value);
        });
};

function FindTown (towns, name){
    for (key in towns) {
        if (towns[key].name.toUpperCase() === name.toUpperCase()) {
            return  key;
        }
    }
};

router.route("/:id")
    .get( function (req, res) {
        rp({
            uri: uriWeather,
            qs: {
                q: req.params.id,
                appid: appid
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true,

        })
            .then(function(responseData){
                console.log('1',req);
                //return res.json(responseData);
                if (responseData.cod !== 200){
                    console.log(304);
                    //return
                    return res.sendStatus(304);
                }else {
                    return res.json(responseData);}

            })
            .catch(function(err){
                console.log('3',err);
                return res.json(err);
            })
            .finally(() => {console.log('OK', res.statusCode)});
    });

router.route("/")
    .get(function(req, res){
        const townsList = JSON.parse(fs.readFileSync("towns.json", "utf8"));
        getWeatherTowns(townsList, req, res);
    })
    .post(jsonParser, (req, res) => {
            if (!req.body) return res.sendStatus(400);
            console.log('S_req.body', req.body);

            const town = req.body;//{name: townName};
            fs.readFile("towns.json", "utf8", function(err, file){
                if(!err){
                    const towns = JSON.parse(file);
                    const ikey = FindTown(towns, town.name);
                    if (!ikey) {
                        towns.push(town);
                        const newFile = JSON.stringify(towns);
                        fs.writeFile("towns.json", newFile, function (err) {
                            if (!err) {
                                getWeatherTowns(towns, req, res);
                                console.log('Ok', towns);
                                //  res.send(towns);
                            }
                        });
                    } else {
                        console.log('Town already exists id LikeList!', key);
                        res.writeHead(403, key);
                        res.end(key);
                        //   res.status(403).send('Sorry');// sendStatus(204);
                    }
                }
            });
        }
    )
    .delete(jsonParser, (req,res) => {
            if (!req.body) return res.setStatus(400);
            const town = req.body;

            fs.readFile("towns.json", "utf8", function(err, file){
                if(!err){
                    const towns = JSON.parse(file);
                    const newArr = [];
                    //-----------------------------
                    for (key in towns) {
                        if (towns[key].name.toUpperCase() !== town.name.toUpperCase()) {
                            newArr.push(towns[key]);
                        }
                    }
                    //-----------------------------
                    const newFile = JSON.stringify(newArr);
                    fs.writeFile("towns.json", newFile, function (err) {
                        if (!err) {
                            getWeatherTowns(newArr, req, res);
                        }
                    });
                }
            });
        }
    );

module.exports = router;