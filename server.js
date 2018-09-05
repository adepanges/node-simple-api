const express = require('express');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const winston = require('winston');

global.logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
	  //
	  // - Write to all logs with level `info` and below to `combined.log` 
	  // - Write all logs error (and below) to `error.log`.
	  //
	  new winston.transports.File({ filename: 'error.log', level: 'error' }),
	  new winston.transports.File({ filename: 'combined.log' })
	]
});

global.BASE_PATH = __dirname;
global.APP_PATH = `${__dirname}/app`;

global.loadApp = (moduleName) => { return require(`${APP_PATH}/${moduleName}`) };
global.loadController = (controllerName) => { return loadApp(`controllers/${controllerName}.controller`) };
global.loadModel = (modelName) => { return loadApp(`models/${modelName}.model`) };
global.loadHelper = (helperName) => { return loadApp(`helpers/${helperName}.helper`) };

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
}).then(() => {
	winston.log('info', 'Successfully connected to the database');    
}).catch(err => {
	winston.log('info', err);
	winston.log('info', 'Could not connect to the database. Exiting now...');
	process.exit();
});

const app = express();
// create express app
loadApp('routes')(app)
// listen for requests
app.listen(3000, () => {
	winston.log('info', 'Server is listening on port 3000');
});
