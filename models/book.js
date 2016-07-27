const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
	ownerName: String,
	title: String,
	author: String,
	cover: String,
	inTrade: Boolean,
});

const Book = mongoose.model('bookGuildBook', BookSchema);

module.exports = Book;
