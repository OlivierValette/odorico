const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../model/User');

passport.use(new JwtStrategy(
    {
        secretOrKey: 'top_secret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    (jwt_payload, done) => done(null, jwt_payload.user)
));

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => UserModel.create({ email, password }, (err, user) => done(err, user))
));

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        UserModel.findOne({ email }, (err, user) => {
            if(!user){
                return done(null, false, { message : 'User not found'});
            }
            user.isValidPassword(password, isValid => {
                if(!isValid){
                    return done(null, false, { message : 'Wrong Password'});
                }
                return done(null, user, { message : 'Logged in Successfully'});
            });
        }
    );
}));