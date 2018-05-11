const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
mongoose.connect('mongodb://meit_chat:PE0cut21@ds217310.mlab.com:17310/chat-app');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
    console.log('Connected to port:' + PORT);
});
