var express = require('express');
var cors = require('cors');
var app = express();

var server = require('http').Server(app);
var io = module.exports.io = require('socket.io')(server);

var mongoose = require('mongoose');
mongoose.connect('mongodb://meit_chat:PE0cut21@ds217310.mlab.com:17310/chat-app');

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const index = require('./routes/index');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');

app.use('/', index);
app.use('/users', userRouter);
app.use('/messages', messageRouter);

const PORT = process.env.PORT || 3231;
const SocketManager = require('./SocketManager');
io.on('connection', SocketManager);
server.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
});
