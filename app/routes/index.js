const express = require('express');

module.exports = (app) => {

	loadMiddleware('request')(app);
	app.use(express.static(BASE_PATH + '/public'))

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
	loadMiddleware('response')(app);
};
