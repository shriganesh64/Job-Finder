const getModelAttributes = (model = {}) => {
	let description = { ...model };
	Object.keys(description).forEach(key => (description[key] = key));

	return description;
};

module.exports = {
	getModelAttributes
};
