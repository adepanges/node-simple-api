const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = loadModel('mongo/user')

function authenticate(req, res, next){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

		res.locals.user = decoded;
		next()
	});
}

function me(req, res) {
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		res.status(200).send(decoded);
	});
}

function login_dummy(req, res) {
	var username = String(req.body.username).trim(),
		password = bcrypt.hashSync(String(req.body.password).trim(), 8);

	User.findOne()
		.then(data => {
			res.json({
				toke: jwt.sign({ data }, config.secret, {
					expiresIn: 86400 // expires in 24 hours
				}),
				data
			});
		})
		.catch(err => {
			res.status(500)
				.json({
					message: 'Username or password is wrong.',
				});
		});
}

function view_login(req, res, next) {
	res.render('resources/views/home')
}

module.exports = {
	authenticate,
	login_dummy,
	me
};
