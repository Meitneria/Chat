const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    password: String
});

UserSchema.pre('save', (next) => {
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                return next(error);
            }
            bcrypt.hash(this.password, salt, (error, hash) => {
                if (error) {
                    return next(error);
                }
                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.comparePassword =  (password, callback) => {
    bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('User', UserSchema);