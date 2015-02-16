var express = require('express'),
    app = express(),
    port = 8666,
    passport = require('passport'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    googelStrategy = require('passport-google').OAuth2Strategy;

app.use(bodyParser.json());
app.use(session({secret: 'ecom holy shit'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new googelStrategy({
	clientID: '1001472552240-tt18lvgptcrvp42614hln8a5u7fs7lih.apps.googleusercontent.com',
	clientSecret: 'l6bcLNdE__iww3QmdQM3V571',
	callbackURL: 'http://localhost:8666/auth/google/callback'
}, function(token, tokenSecret, profile, done) {
	done(null, profile);
}))

app.get('/auth/google', passport.authenticate('google', {scope: ''}));

app.get('/auth/google/callback', passport.authenticate('google', {
	failureRedirect: '/auth/failure'
}, function(req, res) {
	res.redirect('/api/me');
}))





app.listen(port, function() {
	console.log("listening on " + port);
})