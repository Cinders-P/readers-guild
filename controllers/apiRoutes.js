const Book = require('../models/book');

module.exports = (app) => {
	app.use('/api/*', (req, res, next) => {
		console.log('checking auth');
		if (!req.isAuthenticated()) {
			res.end('You are not logged in.');
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
