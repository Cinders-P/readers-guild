const formidable = require('formidable');

module.exports = (app) => {
	app.post('/upload', (req, res) => {
		const form = new formidable.IncomingForm();
		form.uploadDir = './public/img/covers';
		form.keepExtensions = true;
		form.type = 'multipart/form-data';
		form.parse(req, function (err, fields, files) {
			console.log(fields);
			console.log(files);
		});
		res.end();
	});
};
