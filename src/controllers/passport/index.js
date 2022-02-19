const passport = require('passport');
const LocalStrategy = require('./strategies/passport-local');

passport.use(LocalStrategy);