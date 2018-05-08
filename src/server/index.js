var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const passport = require('passport');

var server = require('http').Server(app);
var io = module.exports.io = require('socket.io')(server);
mongoose.connect('mongodb://meit_chat:PE0cut21@ds217310.mlab.com:17310/chat-app');

var Message = require('../model/Messages');
var Users = require('../model/Users');

app.use(cors());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'});
});

router.route('/messages')
    .get((req, res) => {
        Message.find((err, messages) => {
            if (err)
                return res.json({success: false, error: err});
            return res.json(messages)
        });
    })

    .post((req, res) => {
        const message = new Message();
        //body parser lets us use the req.body
        message.sender = req.body.sender;
        message.message = req.body.message;
        message.date = new Date();

        message.save((err) => {
            if (err) return res.send({success: false, error: err});
            return res.json({success: true, message});
        });
    });
app.use('/api', router);

const PORT = process.env.PORT || 3231;
const SocketManager = require('./SocketManager');
io.on('connection', SocketManager);
server.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
});
