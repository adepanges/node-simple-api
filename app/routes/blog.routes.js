module.exports = (app) => {
    const blog = require('../controllers/blog.controller.js')

    // Create a new blog
    app.post('/blog', blog.create);

    // Retrieve all blog
    app.get('/blog', blog.findAll);

    // Retrieve a single blog with blogId
    app.get('/blog/:blogId', blog.findOne);

    // Update a blog with blogId
    app.put('/blog/:blogId', blog.update);

    // Delete a blog with blogId
    app.delete('/blog/:blogId', blog.delete);
}