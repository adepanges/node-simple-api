const bodyParser = require('body-parser');
const rid = require('connect-rid');
const responseTime = require('response-time')

module.exports = (app) => {
	
	app.disable('x-powered-by');
	// parse requests of content-type - application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));
	// parse requests of content-type - application/json
	app.use(bodyParser.json());
	
	app.use(responseTime());
	app.use(rid({
		headerName: 'X-RID'
	}));

	app.use((req, res, next) => {
		var protocol = String(req.protocol).toUpperCase(),
			hostname = req.hostname;
		
		if(protocol == 'HTTP') logger.http(`[${req.method}] ${hostname} ${req.url}`);
		next();
	});
}