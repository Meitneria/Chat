var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    sender: String,
    message: String,
    date: Date
});

module.exports = mongoose.model('Message', MessageSchema);