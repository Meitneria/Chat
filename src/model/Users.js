var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user: String
});

module.exports = mongoose.model('User', UserSchema);