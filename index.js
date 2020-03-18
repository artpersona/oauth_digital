const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const hrRoutes = require('./routes/hr-routes');
const passport = require('passport');
const passportSetup = require('./config/passport-setup')
const cookieSession = require("cookie-session");
const keys = require('./config/keys');

// public


const app = express();
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());


// set up view engine
app.set('view engine', 'ejs');

// set up cookie-session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/hr',hrRoutes);
// create home route
app.get('/', (req, res)=>{
    res.render('home', {user: req.user});
});

// listen to requests
const PORT = process.env.PORT || 5000
app.listen(PORT)