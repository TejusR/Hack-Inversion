const imaps = require('imap-simple');
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var models = require('./db/models');

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
                token: jwt.sign({userId: rollnumber, password: password}, 'secret'),
                status_code:200
            });
        })
        .catch(err => {
            res.json({
                token:"",
                status_code:503
            });
        });
});

router.use(function(req, res, next) {
    if (req.get('Token') !== undefined) {
        const decoded = jwt.decode(req.get('Token'), 'secret');
        if (decoded === null) {
            res.json({
                token:"",
                status_code: 401
            });
        }
        const user = models.User.findOne({
            where: {
                userId: decoded.userId
            }
        });
        user.then(response => {
            if (response.dataValues) {
                req.user = response.dataValues;
                next();
            } else {
                res.json({
                    token:"",
                    status_code: 401
                });
            }
        });
    }
});

router.get('/hello', function(req, res) {
    res.json({
        heli: req.user
    });
});

module.exports = router;
