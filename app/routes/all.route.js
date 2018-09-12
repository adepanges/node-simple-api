const flatten = require('flat');

var routes = {
	api: {
		v1: {
			blog: 'v1/blog',
			joke: 'v1/joke'
		},
		v2: {
			blog: 'v1/blog',
			joke: 'v1/joke'
		}
	}
};

module.exports = (app) => {
	routes = flatten(routes, { delimiter: '/' })
	const list_router = Object.keys(routes)
	list_router.forEach((endpoint) => {
		logger.debug(`[ROUTE] /${endpoint} [TO] ${routes[endpoint]}.route`)
		app.use(`/${endpoint}`, loadRouter(routes[endpoint]))
	})
}
