const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
	title: String,
	slug: String,
	content: String,
}, {
	timeStamps: true,
});

module.exports = mongoose.model('Blog', BlogSchema);
