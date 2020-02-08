const imaps = require('imap-simple');
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var models = require('./db/models');
var multer = require('multer'); // "multer": "^1.1.0"
var multerS3 = require('multer-s3'); //"^1.4.1"
var aws = require('aws-sdk');
aws.config.update({
    secretAccessKey: 'qp4TSOYxjicVixtn1Hw+RMBttbI0ZE+KR7El3Yj+',
    accessKeyId: 'AKIATII432WFCX2QSJWK',
    region: 'ap-south-1'
});
var s3 = new aws.S3();
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'kira99-static',
        key: function(req, file, cb) {
            file.originalname = `${new Date().getTime()}${file.originalname}`;
            cb(null, file.originalname);
            req.file = file;
        }
    })
});

const deg2rad = deg => {
    return deg * (Math.PI / 180);
};
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
};

const jsonify = data => JSON.parse(JSON.stringify(data));

router.post('/login', function(req, res) {
    var rollnumber = req.body.Roll;
    var password = req.body.Password;

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
                // token: jwt.sign({userId: 'SCZ-07', password: 'password'}, 'secret'),
                status_code: 200
            });
        })
        .catch(err => {
            res.json({
                token: '',
                status_code: 503
            });
        });
});

router.use(upload.array('file', 1), function(req, res, next) {
    if (req.body.token !== undefined) {
        // || req.get('token') !== undefined
        // || req.get('token')
        const decoded = jwt.decode(req.body.token, 'secret');
        if (decoded === null) {
            res.json({
                token: 'Invalid token',
                status_code: 401
            });
            return;
        }
        const user = models.User.findOne({
            where: {
                userId: decoded.userId
            }
        });
        user.then(response => {
            response = JSON.parse(JSON.stringify(response));
            if (response === null) {
                res.json({
                    token: 'Invalid token',
                    status_code: 401
                });
                return;
            }
            req.user = response;
            next();
            return;
        });
    } else {
        res.json({
            token: 'No token',
            status_code: 401
        });
        return;
    }
});

router.post('/getShops', function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var shops = models.User.findAll({
        where: {
            userType: 'shop'
        }
    });
    shops.then(response => {
        let shops_ = jsonify(response);
        shops_ = shops_.sort((a, b) => {
            return (
                getDistanceFromLatLonInKm(a.latitude, a.longitude, latitude, longitude) -
                getDistanceFromLatLonInKm(b.latitude, b.longitude, latitude, longitude)
            );
        });
        res.json(shops_);
    });
});

router.post('/initiatePayment', function(req, res) {
    const amount = parseFloat(req.body.amount);
    models.User.findOne({
        where: {
            userId: req.body.toUser
        }
    }).then(response => {
        response = jsonify(response);
        if (response === null) {
            res.json({
                token: 'Invalid user id',
                status_code: 401
            });
            return;
        }
        const payment = models.Payment.create({
            fromId: req.user.id,
            toId: response.id,
            amount
        });
        payment.then(resp => {
            resp = jsonify(resp);
            res.json({
                data: {
                    upiId: response.upiId,
                    orderId: resp.orderId,
                    status_code: 200
                }
            });
        });
    });
});

router.post('/confirmPayment', function(req, res) {
    const orderId = req.body.orderId;
    models.Payment.findOne({
        where: {
            orderId,
            toId: req.user.id
        }
    }).then(response => {
        const order = jsonify(response);
        if (order === null) {
            res.json({
                token: 'Invalid order id',
                status_code: 401
            });
            return;
        }
        if (!response.paid) {
            response.paid = true;
            response.paymentEnd = new Date();
            response.save();
            res.json({
                status_code: 200,
                data: 'Updated'
            });
            return;
        }
        res.json({
            status_code: 401,
            data: 'Payment already confirmed'
        });
    });
});

router.get('/payments', function(req, res) {
    models.Payment.findAll({
        where: {
            fromId: req.user.id
        }
    }).then(sent => {
        sent = jsonify(sent);
        models.Payment.findAll({
            where: {
                toId: req.user.id
            }
        }).then(received => {
            received = jsonify(received);
            res.json({
                data: {
                    sent,
                    received
                },
                status_code: 200
            });
        });
    });
});

router.get('/getForms', (req, res) => {
    models.Form.findAll().then(response => {
        let forms = jsonify(response);
        res.json({forms});
    });
});

router.post('/createForms', (req, res) => {
    console.log(req.user);
    if (req.user.userType == 'admin') {
        name = req.body.name;
        Required = JSON.parse(req.body.required);
        links = JSON.parse(req.body.link);
        models.Form.create({
            name,
            Required,
            links
        }).then(resp => {
            res.json({
                status_code: 200,
                form: jsonify(resp)
            });
        });
    } else {
        res.json({
            data: 'Unauthorized',
            status_code: 401
        });
    }
});
router.post('/specificForm', (req, res) => {
    models.Form.findAll({
        where: {
            id: req.body.id
        }
    }).then(response => {
        let forms = jsonify(response);
        res.json({forms});
    });
});

router.post('/initiateUserForm', function(req, res) {
    models.UserForm.create({
        formid: req.body.formId,
        userid: req.user.id
    }).then(form => {
        form = jsonify(form);
        res.json({form});
    });
});

router.post('/updateForm', function(req, res) {
    if (req.body.name === 'Payment') {
        s3.deleteObject({
            Bucket: 'kira99-static',
            Key: req.file.originalname
        }, (err, data) => {})
        res.json({
            status_code: 401,
            data: "You are not allowed to upload Payments file"
        })
        return;
    }
    models.UserForm.findOne({
        where: {
            id: req.body.formId
        }
    }).then(userForm => {
        let form = jsonify(userForm);
        models.Form.findOne({
            where: {
                id: form.formid
            }
        }).then(resp => {
            resp = jsonify(resp);
            let criteria = resp.Required.filter(r => r.name === req.body.name);
            if (criteria.length === 0) {
                res.json({
                    status_code: 401,
                    data: 'Invalid name'
                })
                return;
            }
            criteria = criteria[0]
            let found = false;
            if (form.submitted === null) form.submitted = [];
            for (let crit of form.submitted) {
                if (crit.name === req.body.name) {
                    s3.deleteObject({
                        Bucket: 'kira99-static',
                        Key: req.file.originalname
                    }, (err, data) => {})
                    found = true;
                    break;
                }
            }
            if (!found)
                form.submitted.push({
                    ...criteria,
                    link: req.file.originalname
                });
            userForm.submitted = form.submitted;
            if (userForm.submitted.length === resp.Required.length) userForm.completed = true;
            userForm.save();
            res.json({
                form: jsonify(userForm)
            });
        });
    });
});

router.post('/getIncompleteForms', function(req, res) {
    models.UserForm.findAll({
        where: {
            userid: req.user.id,
            completed: false
        }
    }).then(userForm => {
        userForm = jsonify(userForm);
        models.Form.findOne({
            where: {
                id: userForm.formid
            }
        }).then(resp => {
            resp = jsonify(resp);
            let criteria = resp.Required.filter(r => r.name === req.body.name)[0];
            let found = false;
            if (form.submitted === null) form.submitted = [];
            for (let crit of form.submitted) {
                if (crit.name === req.body.name) {
                    s3.deleteObject({
                        Bucket: 'kira99-static',
                        Key: req.file.originalname
                    }, (err, data) => {})
                    found = true;
                    break;
                }
            }
            if (!found)
                form.submitted.push({
                    ...criteria,
                    link: req.file.originalname
                });
            userForm.submitted = form.submitted;
            if (userForm.submitted.length === resp.Required.length) userForm.completed = true;
            userForm.save();
            res.json({
                form: jsonify(userForm)
            });
        });
    });
});

module.exports = router;
