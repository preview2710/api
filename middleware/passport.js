const User = require('../models/user');
const {SECRET} = require('../config')
const  JwtStrategy = require('passport-jwt').Strategy,
       ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const user = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
passport.use(new JwtStrategy(opts, async(payload, done)=> {
    await User.findOne(payload.user_id)
    .then(user => {
        if (user) {
            return done(err, false);
        }
            return done(null, user);
        })
        .catch(err=>{
            return done(null, false);
        }) 
    })
);


module.exports = passport;

