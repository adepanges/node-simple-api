module.exports = (app) => {
	app.use((req, res, next) => {

		var meta = {
			code: res.locals.response.code || 200,
			messages: res.locals.response.messages || 'Success',
		}

		if(res.locals.response.code) delete res.locals.response.code;
		if(res.locals.response.messages) delete res.locals.response.messages;

		res.status(meta.code).json({
			meta: meta,
			data: res.locals.response || [],
		})
	});
}