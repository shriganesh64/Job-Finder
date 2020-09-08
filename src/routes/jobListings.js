const express = require('express'),
	adminJobListingsRouter = express(),
	adminRouter = express.Router(),
	{ admin } = require('../controller/jobListings');

adminRouter.get('/', admin.getAllJobs);
adminRouter.post('/', admin.createJob);
adminRouter.put('/:id', admin.updateJob);
adminRouter.delete('/:id', admin.deleteJob);

adminJobListingsRouter.use('/job-listings', adminRouter);

module.exports = {
	adminJobListingsRouter
};
