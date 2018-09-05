const Blog = loadModel('blog');

function create(req, res) {
	if (!req.body.content || !req.body.title) {
		return res
			.status(400)
			.json({
				message: 'Blog Title and Content can not be empty',
			});
	}
    
	const newBlog = new Blog({
		title: req.body.title,
		content: req.body.content,
	});

	newBlog.save()
		.then(data => {
			res.json(data);
		}).catch(err => {
			res.status(500)
				.json({
					message: err.message || 'Some error occurred while creating the Note.',
				});
		});
}

function findAll(req, res) {
	Blog.find()
		.then(blogs => {
			res.json(blogs);
		})
		.catch(err => {
			res.status(500)
				.json({
					message: err.message || 'Some error occurred while retrieving notes.',
				});
		});
}

function findOne(req, res) {
	Blog.findById(req.params.blogId)
		.then(blog => {
			if (!blog) {
				return res.status(404)
					.json({
						message: `[1] Note not found with id ${req.params.blogId}`,
					});
			}
			res.json(blog);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404)
					.json({
						message: `[2] Note not found with id ${req.params.blogId}`,
					});
			}

			return res.status(500)
				.json({
					message: `Error retrieving note with id ${req.params.blogId}`,
				});
		});
}

function update(req, res) {
	if (!req.body.content) {
		return res.status(400)
			.json({
				message: 'Blog content can not be empty',
			});
	}

	Blog.findByIdAndUpdate(req.params.blogId, {
		title: req.body.title || 'Untitled Blog',
		content: req.body.content,
	}, { new: true })
		.then(blog => {
			if (!blog) {
				return res.status(404)
					.json({
						message: `[1] Blog not found with id ${req.params.blogId}`,
					});
			}

			res.json(blog);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404)
					.json({
						message: `[2] Blog not found with id ${req.params.blogId}`,
					});
			}

			return res.status(500)
				.json({
					message: `Error updating note with id ${req.params.blogId}`,
				});
		});
}

function destroy(req, res) {
	Blog.findByIdAndRemove(req.params.blogId)
		.then(blog => {
			if (!blog) {
				return res.status(404)
					.json({
						message: `Note not found with id ${req.params.blogId}`,
					});
			}
			res.json({ message: 'Note deleted successfully!' });
		})
		.catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404)
					.json({
						message: `Note not found with id ${req.params.blogId}`,
					});
			}
			return res.status(500)
				.json({
					message: `Could not delete note with id ${req.params.blogId}`,
				});
		});
}

module.exports = {
	create,
	findAll,
	findOne,
	update,
	destroy,
};
