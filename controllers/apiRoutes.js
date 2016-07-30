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

	const sendTrades = (req, res, x) => {
		Trade.find({
			$and: [{ $or: [{ owner: req.user.local.username }, { recipient: req.user.local.username }] },
				{ completed: x },
			],
		}, (err, trades) => {
			if (trades.length) {
				res.json(trades);
			} else {
				res.end('none');
			}
		});
	};

	app.get('/api/pending-trades', (req, res) => {
		sendTrades(req, res, false);
	});

	app.get('/api/trades-completed', (req, res) => {
		sendTrades(req, res, true);
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
		Trade.findOneAndRemove({
			$and: [
				{ book1: cover },
				{ completed: false },
				{ $or: [{ recipient: req.user.local.username }, { owner: req.user.local.username }] },
			],
		}, (err, doc) => {
			if (!doc) {
				res.json([]);
				return;
			}
			Book.findOneAndUpdate({ cover: doc.book1 }, { $set: { inTrade: false } }, () => {});
			Book.findOneAndUpdate({ cover: doc.book2 }, { $set: { inTrade: false } }, () => {});
			Trade.find({
				$and: [{
					$or: [{ owner: req.user.local.username }, { recipient: req.user.local.username }],
				}, { completed: false }],
			}, (err, trades) => {
				if (trades.length) {
					res.json(trades);
				} else {
					res.json([]);
				}
			});
		});
	});

	app.post('/api/accept-trade', (req, res) => {
		const username = req.user.local.username;
		const cover = req.body.cover;
		Trade.findOneAndUpdate({
			$and: [
				{ book1: cover },
				{ completed: false },
				{ recipient: req.user.local.username },
			],
		}, {
			$set: { completed: true },
		}, (err, trade) => {
			if (!trade) {
				res.end();
				return;
			}
			const response = {};
			const p1 = new Promise(resolve => {
				Book.findOneAndUpdate({ cover: trade.book1 }, { ownerName: trade.recipient, inTrade: false }, resolve);
			});
			const p2 = new Promise(resolve => {
				Book.findOneAndUpdate({ cover: trade.book2 }, { ownerName: trade.owner, inTrade: false }, resolve);
			});
			const p3 = new Promise(resolve => {
				Trade.find({
					$and: [
						{ $or: [{ owner: username }, { recipient: username }] },
						{ completed: false },
					],
				}, (err, docs) => {
					response.pending = docs;
					resolve();
				});
			});
			const p4 = new Promise(resolve => {
				Trade.find({
					$and: [
						{ $or: [{ owner: username }, { recipient: username }] },
						{ completed: true },
					],
				}, (err, docs) => {
					response.done = docs;
					resolve();
				});
			});
			Promise.all([p1, p2, p3, p4]).then(() => {
				res.json(response);
			});
		});
	});
};
