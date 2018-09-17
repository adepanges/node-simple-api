module.exports = (app) => {

	loadMiddleware('request')(app);

	// define a simple route
	app.get('/', (req, res, next) => {
		res.status(200).json({
			status: 'success',
			code: 200,
			message: 'OK Runinng...',
			data: []
		});
	});

	// load all all.route.js
	loadRouter('all')(app);

	loadMiddleware('error')(app);
};
