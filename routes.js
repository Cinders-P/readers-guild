const updateRoutes = require('./controllers/upload');
const apiRoutes = require('./controllers/apiRoutes');
let loggedIn = false;

// MAIN ROUTER
module.exports = (app, passport) => {
	updateRoutes(app);
	apiRoutes(app);

	app.use((req, res, next) => {
		if (req.isAuthenticated()) {
			console.log('logged in.');
			loggedIn = true;
		} else {
			loggedIn = false;
		}
		next();
	});

	app.get('/', (req, res) => {
		res.render('landing', {
			message: req.flash('error'),
			loggedIn,
		});
	});

	app.get('/explore', (req, res) => {
		res.render('explore', {
			loggedIn,
		});
	});

	app.get('/profile', (req, res) => {
		if (loggedIn) {
			res.render('profile', {
				loggedIn,
				username: req.user.local.username,
				city: req.user.local.city,
			});
		} else {
			res.redirect('/');
		}
	});

	app.get('/login', (req, res) => {
		if (loggedIn) {
			res.redirect('/profile');
		}
		res.render('login', {
			message: req.flash('error'),
		});
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true,
	}));

	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash: true,
	}));

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};
