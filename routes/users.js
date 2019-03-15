const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/signup',
    passport.authenticate('signup', { session : false }) , (req, res, next) => {
        res.json({ message : 'Signup successful', user : req.user });
    }
);

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if(err) return next(err);
        if(!user) {
            const error = new Error(info.message);
            return next(error);
        }
        req.login(user, { session : false }, err => {
            if(err) return next(err);
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user : body }, 'top_secret');
            return res.json({ token });
        });
    })(req, res, next);
});

router.get('/profile', passport.authenticate('jwt', { session : false }), (req, res, next) => {
    res.json({
        message : 'You made it to the secure route',
        user : req.user,
        token : req.query.secret_token
    })
});

module.exports = router;
