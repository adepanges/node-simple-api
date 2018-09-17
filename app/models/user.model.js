const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String
}, {
	timeStamps: true,
});

module.exports = mongoose.model('User', UserSchema);
