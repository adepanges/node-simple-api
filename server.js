const express = require('express');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


global.BASE_PATH = __dirname;
global.APP_PATH = `${__dirname}/app`;
global.PORT = 3000;

global.loadApp = (moduleName) => { return require(`${APP_PATH}/${moduleName}`) };
global.loadController = (controllerName) => { return loadApp(`controllers/${controllerName}.controller`) };
global.loadModel = (modelName) => { return loadApp(`models/${modelName}.model`) };
global.loadHelper = (helperName) => { return loadApp(`helpers/${helperName}.helper`) };
global.loadRouter = (routerName) => { return loadApp(`routes/${routerName}.route`) };
global.loadLib = (libName) => { return require(`${BASE_PATH}/libs/${libName}`) };
global.logger = loadLib('logger')

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
}).then(() => {
	logger.debug('Successfully connected to the database');
}).catch(err => {
	logger.info(err);
	logger.debug('Could not connect to the database. Exiting now...');
	process.exit();
});

const app = express();
// create express app
loadApp('routes')(app)
// listen for requests
app.listen(PORT, () => {
	logger.debug('Server is listening on port 3000');
});
