const blogRoutes  = require('./blog.routes')

module.exports = function(app){
    blogRoutes(app)
}