const Sequelize = require('sequelize'),
	{ database } = require('../../config'),
	{ getModelAttributes } = require('../services/utility');

const companyDetailsModel = {
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
	companyName: Sequelize.STRING,
	companyLogo: Sequelize.TEXT,
	location: Sequelize.STRING
};

let companyDetailsFields = { ...companyDetailsModel };
companyDetailsFields = getModelAttributes(companyDetailsFields);

module.exports = {
	companyDetails: database.define('companyDetail', companyDetailsModel),
	companyDetailsFields
};
