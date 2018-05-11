const passport = require('passport');
const settings = require('../passport/settings');
require('../passport/passport')(passport);

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/Users');

/* GET home page. */
router.get('/', (req, res) => {
    res.json({message: 'API Initialized!'});
});

router.post('/register', (req, res) => {
    if (!req.body.nickname || !req.body.password) {
        return res.json({success: false, message: 'Please pass username and password.'});
    }
    let newUser = new User({
        nickname: req.body.nickname,
        password: req.body.password
    });
    
    newUser.save((error) => {
        if (error) {
            return res.json({success: false, message: error.message});
        }
        res.json({success: true, message: 'Successful created new user.'});
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        nickname: req.body.nickname
    }, (error, user) => {
        if (error) return res.status(400).send({success: false, message: error.message});

        if (!user) {
           return res.status(401).send({success: false, message: 'Authentication failed. User not found.'});
        }

        // check if password matches
        user.comparePassword(req.body.password, (error, isMatch) => {
            if (isMatch && !error) {
                // if user is found and password is right create a token
                let token = jwt.sign(user.toJSON(), settings.secret);
                // return the information including token as JSON
                res.json({success: true, token: 'JWT ' + token});
            } else {
                res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
            }
        });

    });
});


module.exports = router;