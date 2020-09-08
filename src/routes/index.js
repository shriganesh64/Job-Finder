const express = require('express'),
	adminAuthenticatedRouter = express.Router(),
	adminApiRouter = express.Router();

const { adminCompanyDetailsRouter } = require('./companyDetails'),
	{ adminJobListingsRouter } = require('./jobListings');

adminAuthenticatedRouter.use(adminCompanyDetailsRouter, adminJobListingsRouter);

adminApiRouter.use('/jobs', adminAuthenticatedRouter);

module.exports = {
	adminApiRouter
};
