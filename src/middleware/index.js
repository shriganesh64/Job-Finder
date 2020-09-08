const response = (statusCode, data, message) => {
	let response = { statusCode, result: {} };
	if (data) response.result.data = data;
	if (message) response.result.message = message;

	return response;
};

const errorHandling = (err, res) => {
	return res.send({
		statusCode: 500,
		result: {
			message: err.message
		}
	});
};

module.exports = {
	response,
	errorHandling
};
