var express = require('express');
var router = express.Router();
const Message = require('../../models/Messages');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.route('/')
    .get((req, res) => {
        Message.find((err, messages) => {
            if (err)
                return res.json({success: false, error: err});
            return res.json(messages)
        });
    })

    .post((req, res) => {
        const message = new Message();
        message.sender = req.body.sender;
        message.message = req.body.message;
        message.date = new Date();
        message.save((err) => {
            if (err) return res.send({success: false, error: err});
            return res.json({success: true, message});
        });
    });

module.exports = router;

