const Book = require('../models/book');
const User = require('../models/user');

module.exports = (app) => {
	app.get('/api/all-books', (req, res) => {
		Book.find({}, (err, data) => {
			res.json(data);
			res.end();
		});
	});

	app.use('/api/*', (req, res, next) => {
		if (!req.isAuthenticated()) {
			res.sendStatus(401).end('You are not logged in.');
			return;
		}
		next();
	});

	app.get('/api/my-books', (req, res) => {
		Book.find({ ownerName: req.user.local.username }, (err, data) => {
			res.json(data);
			res.end();
		});
	});

	app.get('/api/user', (req, res) => {
		console.log('request for user');
		User.findOne({ 'local.username': req.user.local.username }, {
			'local.username': 1,
			'local.city': 1,
			'local.picture': 1,
			'local.realname': 1,
		}, (err, data) => {
			res.json(data.local);
			res.end();
		});
	});

	app.post('/api/delete-book', (req, res) => {
		Book.findOneAndRemove({ ownerName: req.user.local.username, title: req.body.title }, (err) => {
			if (!err) {
				res.end('true');
			} else {
				console.error(err);
				res.end('false');
			}
		});
	});
};
