const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
		passReqToCallback: true,
	},
		(req, username, password, done) => {
			User.findOne({
				'local.username': username,
			}, (err, user) => {
				process.nextTick(() => {
					if (err) {
						return done(err, false, req.flash('error', 'There was an error processing your request.'));
					} else if (!user) {
						return done(null, false, req.flash('error', 'That user doesn\'t exist.'));
					} else if (!user.validPassword(password)) {
						return done(null, false, req.flash('error', 'Incorrect password.'));
					} else {
						console.log('Logging in user.');
						return done(null, user);
					}
				});
			});
		}));

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true,
	}, (req, username, password, done) => {
		console.log(req.body);

		User.findOne({
			$or: [{
				'local.username': username,
			}, {
				'local.email': req.body.email,
			}],
		}, (err, user) => {
			if (err) {
				return done(null, false, req.flash('error', 'There was an error processing your request.'));
			} else if (user) {
				return done(null, false, req.flash('error', 'That account is already registered.'));
			} else if ((password.length < 4) || (username.length < 4) || (req.body.email.length < 4)) {
				return done(null, false, req.flash('error', 'Each field must be at least 4 characters.'));
			}

			const newUser = new User();

			newUser.local.username = username;
			newUser.local.password = newUser.generateHash(password);
			newUser.local.email = req.body.email;
			if (req.body.newsletter) {
				newUser.local.newsletter = true;
			} else {
				newUser.local.newsletter = false;
			}
			newUser.save((err) => {
				console.log('Creating new user.');
				if (err) throw err;
				return done(null, newUser);
			});
		});
	}));
};
