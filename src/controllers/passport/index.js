const passport = require('passport');
const LocalStrategy = require('./strategies/passport-local');
const JwtStrategy = require('./strategies/passport-jwt');

passport.use(LocalStrategy);
passport.use(JwtStrategy);