const Sequelize = require('sequelize'),
	{ database } = require('../../config'),
	{ getModelAttributes } = require('../services/utility');

const jobListingModel = {
	id: {
		type: Sequelize.STRING,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	isActive: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	createdBy: Sequelize.STRING,
	updatedBy: Sequelize.STRING,
	title: Sequelize.STRING,
	description: Sequelize.STRING,
	ctc: Sequelize.STRING,
	experience: Sequelize.STRING,
	jobTags: Sequelize.TEXT
};

let jobListingFields = { ...jobListingModel, companyId: 'companyId' };
jobListingFields = getModelAttributes(jobListingFields);

module.exports = {
	jobListing: database.define('jobListing', jobListingModel),
	jobListingFields
};
