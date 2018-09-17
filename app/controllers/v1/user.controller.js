const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = loadModel('user');

function create(req, res) {
	if (!req.body.email || !req.body.password) {
		return res
			.status(400)
			.json({
				message: 'Email and password can not be empty',
			});
	}
    
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	});

	newUser.save()
		.then(data => {
			// create a token
			var token = jwt.sign({ id: data._id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.json({
				data, token
			});
		}).catch(err => {
			res.status(500)
				.json({
					message: err.message || 'Some error occurred while creating the User.',
				});
		});
}

function findAll(req, res) {
	User.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(500)
				.json({
					message: err.message || 'Some error occurred while retrieving Users.',
				});
		});
}

function findOne(req, res) {
	User.findById(req.params.userId)
		.then(user => {
			if (!user) {
				return res.status(404)
					.json({
						message: `[1] User not found with id ${req.params.userId}`,
					});
			}
			res.json(user);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404)
					.json({
						message: `[2] User not found with id ${req.params.userId}`,
					});
			}

			return res.status(500)
				.json({
					message: `Error retrieving User with id ${req.params.userId}`,
				});
		});
}

function update(req, res) {
	if (!req.body.email || !req.body.password) {
		return res
			.status(400)
			.json({
				message: 'Email and password can not be empty',
			});
	}

	User.findByIdAndUpdate(req.params.userId, {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	}, { new: true })
		.then(user => {
			if (!user) {
				return res.status(404)
					.json({
						message: `[1] User not found with id ${req.params.userId}`,
					});
			}

			res.json(user);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404)
					.json({
						message: `[2] User not found with id ${req.params.userId}`,
					});
			}

			return res.status(500)
				.json({
					message: `Error updating user with id ${req.params.userId}`,
				});
		});
}

function destroy(req, res) {
	User.findByIdAndRemove(req.params.userId)
		.then(user => {
			if (!user) {
				return res.status(404)
					.json({
						message: `User not found with id ${req.params.userId}`,
					});
			}
			res.json({ message: 'User deleted successfully!' });
		})
		.catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404)
					.json({
						message: `User not found with id ${req.params.userId}`,
					});
			}
			return res.status(500)
				.json({
					message: `Could not delete user with id ${req.params.userId}`,
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
