const flatten = require('flat');

var routes = {
	api: {
		v1: {
			auth: 'api/v1/auth',
			blog: 'api/v1/blog',
			joke: 'api/v1/joke',
			user: 'api/v1/user',
		}
	},
	auth: 'web/auth'
};

module.exports = (app) => {
	routes = flatten(routes, { delimiter: '/' })
	const list_router = Object.keys(routes)
	list_router.forEach((endpoint) => {
		logger.debug(`[ROUTE] /${endpoint} [TO] ${routes[endpoint]}.route`)
		app.use(`/${endpoint}`, loadRouter(routes[endpoint]))
	})
}
