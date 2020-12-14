var express = require('express');
var router = express.Router();
const request = require("request");
var rp = require('request-promise');
const fetch = require('node-fetch');
const ps4Config = require('../config/ps4Config');

const redis =  require('redis');
const client = redis.createClient();
const {promisify} = require('util');
const asyncExists = promisify(client.exists).bind(client);
const asyncSet = promisify(client.set).bind(client);
const asyncExpire = promisify(client.expire).bind(client);
const cors = require('cors');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.render('ps4', { title: 'Hey now' });
});

router.post('/', function(req, res, next) {
    res.json({ title: 'Hey Now but a post' });
    //  res.send('hey now')
});

router.options("/", function (req, res, next) {
    res.writeHead(200, {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
    });
    res.end();
});

router.options("/player", function (req, res, next) {
    res.writeHead(200, {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
    });
    res.end();
});

// Grabs name from HTML form and returns json object of result
router.post('/player', async (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log(request.body);
    if (typeof request.body.player === 'undefined') {
        // The parameter is missing, example response...
        response.status(400).json({error: 'missing parameter team', data: null}); // Only an  example
        return;
    }
    let player = request.body.player;
    console.log(player)
  //  let api_url = ps4Config.ps4Options.url + player + '%25';
    let api_url = `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${player}%25'`;
    let fetch_response = await fetch(api_url);
    let json = await fetch_response.json();
   // console.log(fetch_response);
  //  return response.json(json)
 //   json = JSON.stringify(json);

    console.log(json)
    let firststat = json.toString();
    console.log(firststat)

    let match = await asyncExists(player);
    if (match) {
        let resp = {
            json: json,
            cached: true
        }
        return response.json(resp);
    } else {
        let status = asyncSet(player, firststat);
        status = await asyncExpire(player, 15);
        let resp = {
            json: json,
            cached: false
        }
        return response.json(resp)
    }
   // response.json(firststat);

});


module.exports = router;
