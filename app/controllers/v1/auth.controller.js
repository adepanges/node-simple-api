const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = loadModel('user')

function me(req, res) {
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		res.status(200).send(decoded);
	});
}

function login(req, res) {
	
}

module.exports = {
	me
};
