const { companyDetails, companyDetailsFields } = require('./companyDetails'),
	{ jobListing, jobListingFields } = require('./jobListings');

companyDetails.hasMany(jobListing);
jobListing.belongsTo(companyDetails, {
	constraints: false,
	foreignKey: 'companyId'
});

const modelFields = {
	companyDetailsFields,
	jobListingFields
};

module.exports = {
	modelFields,
	companyDetails,
	jobListing
};
