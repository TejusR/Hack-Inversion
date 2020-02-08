const imaps = require('imap-simple');
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var models = require('./db/models');

router.get('/getForms', (req, res) => {
    var forms = models.Form.findAll();
    res.json(forms);
});
router.post('/createForm', (req, res) => {
    models.Form.create({
        name: 'test form',
        Required: 'jhglhnjdshof',
        links: 'kugshkfgkds'
    });
    res.send('hgshd');
});
