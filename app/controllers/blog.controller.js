const Blog = require('../models/blog.model')

exports.create = (req, res) => {
    if(!req.body.content || !req.body.title){
        return res
        .status(400)
        .send({
            message: 'Blog Title and Content can not be empty'
        })
    }
    
    const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content
    })

    newBlog.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500)
            .send({
                message: err.message || "Some error occurred while creating the Note."
            })
        })
}

exports.findAll = (req, res) => {
    Blog.find()
        .then(blogs => {
            res.send(blogs)
        })
        .catch(err => {
            res.status(500)
            send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        })
}

exports.findOne = (req, res) => {
    Blog.findById(req.params.blogId)
        .then(blog => {
            if(!blog){
                return res.status(404)
                .send({
                    message: "[1] Note not found with id " + req.params.blogId
                })
            }

            res.send(blog)
        })
        .catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404)
                .send({
                    message: "[2] Note not found with id " + req.params.blogId
                })
            }

            return res.status(500)
            .send({
                message: "Error retrieving note with id " + req.params.blogId
            })
        })
}

exports.update = (req, res) => {
    if(!req.body.content){
        return res.status(400)
        .send({
            message: 'Blog content can not be empty'
        })
    }

    Blog.findByIdAndUpdate(req.params.blogId, {
            title: req.body.title || "Untitled Blog",
            content: req.body.content
        }, {new: true})
        .then(blog => {
            if(!blog){
                return res.status(404)
                .send({
                    message: '[1] Blog not found with id ' + req.params.blogId
                })
            }

            res.send(blog);
        })
        .catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404)
                .send({
                    message: '[2] Blog not found with id ' + req.params.blogId
                })
            }

            return res.status(500)
            .send({
                message: "Error updating note with id " + req.params.blogId
            })
        })
}

exports.delete = (req, res) => {
    Blog.findByIdAndRemove(req.params.blogId)
        .then(blog => {
            if(!blog){
                return res.status(404)
                .send({
                    message: "Note not found with id " + req.params.blogId
                })
            }

            res.send({message: "Note deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404)
                .send({
                    message: "Note not found with id " + req.params.blogId
                });                
            }
            return res.status(500)
            .send({
                message: "Could not delete note with id " + req.params.blogId
            });
        })
    
}
