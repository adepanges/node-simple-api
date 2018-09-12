const { createLogger, format, transports, addColors } = require('winston');
const { combine, timestamp, printf } = format;
const moment = require('moment');

const customLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		debug: 4,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'white',
		http: 'green',
		debug: 'blue',
	}
};

addColors(customLevels.colors);

module.exports = createLogger({
	levels: customLevels.levels,
	format: combine(
		timestamp(),
		printf(info => {
			var datetime = moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
			var symLevel = Symbol.for('level'),
				level = String(info[symLevel]).toUpperCase();
			return `${datetime} [${level}]: ${info.message}`;
		})
	),
	transports: [
		new transports.Console({ level: 'debug' }),
		new transports.File({ filename: `${APP_PATH}/logs/combined.log` }),
		// new transports.File({ filename: `${APP_PATH}/logs/system.log`, level: 'system' }),
		new transports.File({ filename: `${APP_PATH}/logs/http.log`, level: 'http' }),
		new transports.File({ filename: `${APP_PATH}/logs/info.log`, level: 'info' }),
		new transports.File({ filename: `${APP_PATH}/logs/warn.log`, level: 'warn' }),
		new transports.File({ filename: `${APP_PATH}/logs/error.log`, level: 'error' }),
	]
});