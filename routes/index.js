var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        'index': { title: 'Express' }
    });
});

/* GET home page. */
router.post('/', function(req, res, next) {
    res.json({
        'sensible data': { id: 'IGD8GSNGDS0D372R443GNS8DNSDBS984H3NGF309232RNF2490' }
    });
});

module.exports = router;