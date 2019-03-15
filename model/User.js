const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

// password coding hook
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});

UserSchema.methods.isValidPassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isEqual) => done(isEqual));
};

const UserModel = mongoose.model('users',UserSchema);

module.exports = UserModel;