var express = require('express');
var router = express.Router();
var validate = require('express-validation')
var signupRequestValidation = require('./signupRequestValidation');

router.post('/signup/', validate(signupRequestValidation), function (req, res) {
  if (req.body.password === req.body.repeatedPassword) {
    return res.status(200).json({userId: 'test'});
  } else {
    res.status(500).json({error: 'password and repeated password must be the same'});
  }
    
});

module.exports = router;