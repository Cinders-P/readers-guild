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
		realname: {
			type: String,
			default: '',
		},
		newsletter: Boolean,
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
