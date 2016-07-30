const formidable = require('formidable');
const Book = require('../models/book');
const Trade = require('../models/trade');
const User = require('../models/user');

module.exports = (app) => {
	app.post('/upload', (req, res) => {
		if (!req.isAuthenticated()) {
			return;
		}
		const form = new formidable.IncomingForm();
		form.uploadDir = './public/img/covers';
		form.keepExtensions = true;
		form.type = 'multipart/form-data';
		form.parse(req, (err, fields, files) => {
			const newBook = new Book({
				ownerName: req.user.local.username,
				title: fields.title,
				author: fields.author,
				// gets only the converted file name, including extension
				cover: files.cover.path.match(/covers\\(\w+\.\w+)/)[1],
				inTrade: false,
			});

			newBook.save((err) => {
				if (err) console.error(err);
				else console.log('Saved new book.');
			});
		});
		res.end();
	});

	app.post('/create-trade', (req, res) => {
		if (!req.isAuthenticated()) {
			res.sendStatus(401).redirect('/');
			return;
		}
		const newTrade = new Trade();
		newTrade.book1 = req.body.book1;
		newTrade.book2 = req.body.book2;
		newTrade.owner = req.user.local.username;
		const p1 = new Promise(resolve =>
			Book.findOneAndUpdate({ cover: req.body.book1 }, { $set: { inTrade: true } }, (err, doc) => {
				newTrade.title1 = doc.title;
				resolve();
			}));
		const p2 = new Promise(resolve => {
			Book.findOneAndUpdate({ cover: req.body.book2 }, { $set: { inTrade: true } }, (err, doc) => {
				newTrade.recipient = doc.ownerName;
				newTrade.title2 = doc.title;
				resolve();
			});
		});
		Promise.all([p1, p2]).then(() => {
			newTrade.save(err => {
				if (err) console.error(err);
			});
			Book.find({}, (err, books) => {
				const response = {};
				response.books = books;
				Book.find({ ownerName: req.user.local.username }, (err, myBooks) => {
					response.myBooks = myBooks;
					res.json(response);
				});
			});
		});
	});

	app.post('/update-user', (req, res) => {
		if (!req.isAuthenticated()) {
			res.sendStatus(401).redirect('/');
			return;
		}
		const form = new formidable.IncomingForm();
		form.uploadDir = './public/img/profile-pics';
		form.keepExtensions = true;
		form.type = 'multipart/form-data';
		form.parse(req, (err, fields, files) => {
			// only update the fields which had values in the form
			const p1 = () => {
				if (fields.realname.length) {
					return new Promise((resolve) => {
						User.findOneAndUpdate({ 'local.username': req.user.local.username }, {
							$set: { 'local.realname': fields.realname },
						}, resolve);
					});
				}
				return 1;
			};
			const p2 = () => {
				if (fields.city.length) {
					return new Promise((resolve) => {
						User.findOneAndUpdate({ 'local.username': req.user.local.username }, {
							$set: { 'local.city': fields.city },
						}, resolve);
					});
				}
				return 1;
			};
			const p3 = () => {
				if (files.picture) {
					return new Promise((resolve) => {
						User.findOneAndUpdate({ 'local.username': req.user.local.username }, {
							$set: { 'local.picture': files.picture.path.match(/profile-pics\\(\w+\.\w+)/)[1] },
						}, resolve);
					});
				}
				return 1;
			};
			const promises = [p1(), p2(), p3()];
			Promise.all(promises).then(() => {
				// Triggers an update action on response,
				// so we have to wait until the db processes are finished
				User.findOne({ 'local.username': req.user.local.username }, {
					'local.username': 1,
					'local.city': 1,
					'local.picture': 1,
					'local.realname': 1,
				}, (err, user) => {
					res.json(user.local);
				});
			});
		});
	});
};
