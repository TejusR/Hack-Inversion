const imaps = require('imap-simple')
const jwt = require('jsonwebtoken')
var express = require('express')
var router = express.Router()
var request = require('request');

// middleware that is specific to this router

router.post('/login', function (req, res) {
  var rollnumber=req.body.Roll
  var password=req.body.Password

  console.log({rollnumber,password})

  const imapConfig = {
    imap: {
      user: rollnumber,
      password: password,
      host: '10.0.0.173',
      port: 143,
      tls: false,
      authTimeout: 30000
    }
  }

  imaps.connect(imapConfig).then(connection => {
    res.send("Logged In");
  }).catch(err => {
    res.send("Wrong Credentials!");
  })

})

module.exports = router;