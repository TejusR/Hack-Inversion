const imaps = require('imap-simple');
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var models = require('./db/models');

function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

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
    if (req.body.token !== undefined) {
        const decoded = jwt.decode(req.body.token, 'secret');
        if (decoded === null) {
            res.json({
                token:"Invalid token",
                status_code: 401
            });
            return
        }
        const user = models.User.findOne({
            where: {
                userId: decoded.userId
            }
        });
        user.then(response => {
            response = JSON.parse(JSON.stringify(response))
            if (response === null) {
                res.json({
                    token:"Invalid token",
                    status_code: 401
                });
                return
            }
            req.user = response;
            next();
            return
        });
    } else {
        res.json({
            token:"No token",
            status_code: 401
        });
        return
    }
});

router.post('/getShops', function(req, res) {
    var latitude = req.body.latitude
    var longitude = req.body.longitude
    var shops=models.User.findAll({
        where:{
            userType:'shop'
        }
    })
    shops.then(response => {
        let shops_ = JSON.parse(JSON.stringify(response));
        shops_=shops_.sort((a,b)=>{
            return getDistanceFromLatLonInKm(a.latitude,a.longitude,latitude,longitude)-getDistanceFromLatLonInKm(b.latitude,b.longitude,latitude,longitude)
        })
        res.json(shops_);
    })
});

module.exports = router;
