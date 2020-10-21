var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ title: 'Hey Now2' });
});

router.post('/', function(req, res, next) {
    res.json({ title: 'Hey Now but a post' });
  //  res.send('hey now')
});

module.exports = router;
