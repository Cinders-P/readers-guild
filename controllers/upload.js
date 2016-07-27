const formidable = require('formidable');
const Book = require('../models/book');

module.exports = (app) => {
	app.post('/upload', (req, res) => {
		if (!req.isAuthenticated()) {
			res.sendStatus(401).end();
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
};
