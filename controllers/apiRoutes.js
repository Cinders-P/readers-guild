const Book = require('../models/book');
const User = require('../models/user');
const Trade = require('../models/trade');

module.exports = (app) => {
	app.get('/api/all-books', (req, res) => {
		Book.find({}, (err, data) => {
			res.json(data);
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
		});
	});

	app.get('/api/user', (req, res) => {
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

	app.get('/api/pending-trades', (req, res) => {
		Trade.find({
			$or: [{ owner: req.user.local.username }, { recipient: req.user.local.username }],
		}, (err, trades) => {
			if (trades.length) {
				res.json(trades);
			} else {
				res.end('none');
			}
		});
	});

	app.post('/api/delete-book', (req, res) => {
		const cover = req.body.cover;
		Trade.findOne({ $or: [{ book1: cover }, { book2: cover }] }, (err, doc) => {
			if (!doc) {
				Book.findOneAndRemove({
					cover,
				}, (err) => {
					if (!err) {
						res.end('true');
					} else {
						console.error(err);
						res.end('false');
					}
				});
			} else {
				res.end('trade');
			}
		});
	});

	app.post('/api/cancel-trade', (req, res) => {
		const cover = req.body.cover;
		Trade.findOneAndRemove({ book1: cover }, (err, doc) => {
			Book.findOneAndUpdate({ cover: doc.book1 }, { $set: { inTrade: false } }, () => {});
			Book.findOneAndUpdate({ cover: doc.book2 }, { $set: { inTrade: false } }, () => {});
			Trade.find({}, (err, trades) => {
				if (trades.length) {
					res.json(trades);
				} else {
					res.json([]);
				}
			});
		});
	});
};
