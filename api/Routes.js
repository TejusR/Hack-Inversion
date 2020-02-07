const imaps = require('imap-simple');
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res) {
    var rollnumber = req.body.Roll;
    var password = req.body.Password;

    console.log({rollnumber, password});

    const imapConfig = {
        imap: {
            user: rollnumber,
            password: password,
            host: '10.0.0.173',
            port: 143,
            tls: false,
            authTimeout: 3000
        }
    };

    imaps
        .connect(imapConfig)
        .then(connection => {
            res.json({
                token: jwt.sign({user: rollnumber, password: password}, 'secret')
            });
        })
        .catch(err => {
            res.send('Wrong Credentials!');
        });
});

router.use(function(req, res, next) {
    if (req.get('Token') !== undefined) {
        const decoded = jwt.decode(req.get('Token'), 'secret');
        console.log(decoded);
    }
    next();
});

router.get('/hello', function(req, res) {
    res.json({
        helo: 'helo'
    });
});

module.exports = router;
