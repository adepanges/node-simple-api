const mongoose = require('mongoose');

module.exports = () => {
	global.loadApp = (moduleName) => { return require(`${APP_PATH}/${moduleName}`) };
	global.loadMiddleware = (middlewareName) => { return loadApp(`middleware/${middlewareName}.middleware`) };
	global.loadController = (controllerName) => { return loadApp(`controllers/${controllerName}.controller`) };
	global.loadModel = (modelName) => { return loadApp(`models/${modelName}.model`) };
	global.loadHelper = (helperName) => { return loadApp(`helpers/${helperName}.helper`) };
	global.loadRouter = (routerName) => { return loadApp(`routes/${routerName}.route`) };
	global.loadLib = (libName) => { return require(`${BASE_PATH}/libs/${libName}`) };
	global.logger = loadLib('logger')
	global.config = require('./config')

	mongoose.Promise = global.Promise;
	// Connecting to the database
	mongoose.connect(config.database.mongo_url, {
		useNewUrlParser: true,
	}).then(() => {
		logger.debug('Successfully connected to the database');
	}).catch(err => {
		logger.info(err);
		logger.debug('Could not connect to the database. Exiting now...');
		process.exit();
	});
}
