const express = require('express');
const router = express.Router();
const Message = require('../../models/Messages');

router.route('/')
    .get((req, res) => {
        Message.find((error, messages) => {
            if (error)
                return res.json({success: false, error: error});
            return res.json(messages)
        });
    })

    .post((req, res) => {
        const message = new Message();
        message.sender = req.body.sender;
        message.message = req.body.message;
        message.date = new Date();
        message.save((error) => {
            if (error) return res.send({success: false, error: error});
            return res.json({success: true, message});
        });
    });

module.exports = router;

