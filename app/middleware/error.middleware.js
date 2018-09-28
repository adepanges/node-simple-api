module.exports = (app) => {
	app.use((err, req, res, next) => { 
		const { start, httpStatus, message, previousError, stack } = err 
		res.status(httpStatus || 406).json({ 
			status: false, 
			code: httpStatus || 406, 
			message, 
			data: previousError, 
		}) 
	})
}