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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('ps4', { title: 'Hey now' });
});

router.post('/', function(req, res, next) {
    res.json({ title: 'Hey Now but a post' });
    //  res.send('hey now')
});

// Grabs name from HTML form and returns json object of result
router.post('/player', async (request, response) => {
    if (typeof request.body.player === 'undefined') {
        // The parameter is missing, example response...
        res.status(400).json({error: 'missing parameter team', data: null}); // Only an  example
        return;
    }
    let player = request.body.player;
    let api_url = ps4Config.ps4Options.url + player + '%25';
  //  let api_url = `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${player}%25'`;
    let fetch_response = await fetch(api_url);
    let json = await fetch_response.json();
  //  json = JSON.stringify(json);


    console.log(json)
    let firststat = json.toString();
    console.log(firststat)

    let match = await asyncExists(player);
    if (match) {
        let resp = {
            json: firststat,
            cached: true
        }
        response.json(resp);
    } else {
        let status = asyncSet(player, firststat);
        status = await asyncExpire(player, 15);
        let resp = {
            json: firststat,
            cached: false
        }
        response.json(resp)
    }
   // response.json(firststat);
});


module.exports = router;
