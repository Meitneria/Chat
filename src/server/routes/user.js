const express = require('express');
const router = express.Router();
const User = require('../../models/Users');

router.route('/')
    .get((req, res) => {

        User.find((error, users) => {
            if (error)
                return res.json({success: false, error: error});
            return res.json(users)
        });
    })

    .post((req, res) => {
        const user = new User();
        user.nickname = req.body.nickname;       
        user.password = req.body.password;

        user.save((error) => {
            if (error) return res.send({success: false, error: error});
            return res.json({success: true, user});
        });
    });

module.exports = router;