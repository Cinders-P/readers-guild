const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
	owner: String,
	recipient: String,
	book1: String,
	book2: String,
	completed: Boolean,
});

const Trade = mongoose.model('bookGuildTrade', TradeSchema);

module.exports = Trade;
