const axios = require('axios');
const JOKES_URL = 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke';

const randomJoke = async (req, res) => {
	const joke = await axios.get(JOKES_URL);
	res.json({
		status: true,
		code: 200,
		message: 'Success',
		data: joke.data || joke,
	})
}

module.exports = {
	randomJoke,
};