const mongoose = require('mongoose');
var exphbs  = require('express-handlebars');

module.exports = (app) => {
	global.loadApp = (moduleName) => { return require(`${APP_PATH}/${moduleName}`) };
	global.loadMiddleware = (middlewareName) => { return loadApp(`middleware/${middlewareName}.middleware`) };
	global.loadController = (controllerName) => { return loadApp(`controllers/${controllerName}.controller`) };
	global.loadModel = (modelName) => { return loadApp(`models/${modelName}.model`) };
	global.loadHelper = (helperName) => { return loadApp(`helpers/${helperName}.helper`) };
	global.loadRouter = (routerName) => { return loadApp(`routes/${routerName}.route`) };
	global.loadLib = (libName) => { return require(`${BASE_PATH}/libs/${libName}`) };
	global.logger = loadLib('logger')
	global.config = require('./config')

	app.set('views', BASE_PATH + '/resources/views/');
	app.engine('hbs', exphbs({
		defaultLayout: 'main', 
		extname: '.hbs',
		layoutsDir:'resources/views/layouts',
		partialsDir:'resources/views/partials'
	}));
	app.set('view engine', 'hbs');

	mongoose.Promise = global.Promise;
	// Connecting to the database
	mongoose.connect(config.database.mongo_url, {
		useNewUrlParser: true,
	}).then(() => {
		logger.debug('Successfully connected to the database');
	}).catch(err => {
		logger.info(err);
		logger.debug('Could not connect to the mongo database. Exiting now...');
		process.exit();
	});
}
