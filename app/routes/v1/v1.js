const blog = require('./v1/blog.routes');

module.exports = (app) => {
	app.use('/v1/blog', blog);
};
