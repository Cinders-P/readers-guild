const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
	owner: String,
	recipient: String,
	book1: String,
	book2: String,
	title1: String,
	title2: String,
	completed: { type: Boolean, default: false },
});

const Trade = mongoose.model('bookGuildTrade', TradeSchema);

module.exports = Trade;
