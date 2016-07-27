const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
	local: {
		username: String,
		password: String,
		email: String,
		city: {
			type: String,
			default: '',
		},
		picture: {
			type: String,
			default: '',
		},
		newsletter: Boolean,
		books: [String],
		trades: [String],
	},
});

UserSchema.methods = {
	generateHash(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},
	validPassword(password) {
		return bcrypt.compareSync(password, this.local.password);
	},
};

const User = mongoose.model('bookGuildUser', UserSchema);

module.exports = User;
