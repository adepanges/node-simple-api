const axios = require('axios');
const JOKES_URL = 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke';

const randomJoke = async (req, res, next) => {
	const joke = await axios.get(JOKES_URL);
	
	res.locals.response = {
		code: 400,
		messages: 'hai',
		joke: joke.data
	}
	next()
}

module.exports = {
	randomJoke,
};