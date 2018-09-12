const bodyParser = require('body-parser');
// const rid = require('connect-rid');
const responseTime = require('response-time')

module.exports = (app) => {
	// --------------- BEGIN middleware ---------------
	app.disable('x-powered-by');
	// parse requests of content-type - application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));
	// parse requests of content-type - application/json
	app.use(bodyParser.json());
	
	app.use(responseTime());
	// app.use(rid());

	app.use((req, res, next) => {
		logger.http('HTTP Request');
		next();
	});
	// --------------- END middleware ---------------

	// define a simple route
	app.get('/', (req, res, next) => {
		res.status(200).json({
			status: 'success',
			code: 200,
			message: 'OK Runinng...',
			data: []
		});
	});

	loadRouter('all')(app);

	app.use((err, req, res, next) => {
		const { start, httpStatus, message, previousError, stack } = err
		res.status(httpStatus || 406).json({
			status: false,
			code: httpStatus || 406,
			message,
			data: previousError,
		})
	})
};

