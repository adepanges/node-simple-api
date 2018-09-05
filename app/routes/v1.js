const blog = require('./v1/blog.routes');
const joke = require('./v1/joke.routes');

module.exports = (app) => {
	app.use('/v1/blog', blog);
	app.use('/v1/joke', joke);
};
