var express = require('express');
var router = express.Router();

// middleware that is specific to this router

router.get('/login', function(req, res) {
    res.send('login');
});

module.exports = router;
