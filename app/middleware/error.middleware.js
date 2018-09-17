const bodyParser = require('body-parser');
const rid = require('connect-rid');
const responseTime = require('response-time')

module.exports = (app) => {
	app.use((req, res, next) => {
		var protocol = String(req.protocol).toUpperCase(),
			hostname = req.hostname;
		if(protocol == 'HTTP') logger.http(`[${req.method}] ${hostname} ${req.url}`);
		next();
	});
}