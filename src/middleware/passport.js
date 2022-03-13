const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { User } = require('../models')
const config = require('config');


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.get('SECRET_KEY')

module.exports = (app) => {
    app.use(passport.initialize())

    passport.use(new JwtStrategy(opts, (payload, done) => {
        User.findOne({ _id: payload._id, status: 1 })
            .then(user => {
                if (!user) {
                    return done(null, false)
                } else {
                    user.companyId = payload.companyId
                    user.companyName = payload.companyName
                    return done(null, user)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
    }))
}