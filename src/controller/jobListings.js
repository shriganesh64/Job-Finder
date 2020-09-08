const middleware = require('../middleware');
const { companyDetailsFields } = require('../models/companyDetails');
const model = require('../models'),
	{
		modelFields: { jobListingFields }
	} = model;

let admin = {};

admin.getAllJobs = (req, res, next) => {
	try {
		model.jobListing
			.findAll({
				where: {
					[jobListingFields.isActive]: true
				},
				include: [
					{
						model: model.companyDetails,
						required: true,
						where: {
							[companyDetailsFields.isActive]: true
						}
					}
				],
				order: [['createdAt', 'DESC']]
			})
			.then(result => {
				if (result.length) {
					res.send(middleware.response(200, result));
				} else {
					res.send(middleware.response(404, null, 'No jobs found.'));
				}
			})
			.catch(err => {
				middleware.errorHandling(err, res);
			});
	} catch (err) {
		next(err);
	}
};

admin.createJob = (req, res, next) => {
	try {
		model.jobListing
			.create({
				...req.body
			})
			.then(result => {
				if (result.id) {
					res.send(middleware.response(200, null, 'Job created successfully.'));
				} else {
					res.send(middleware.response(500, null, "Couldn't create job."));
				}
			})
			.catch(err => {
				middleware.errorHandling(err, res);
			});
	} catch (err) {
		next(err);
	}
};

admin.updateJob = (req, res, next) => {
	try {
		model.jobListing
			.update(
				{
					...req.body
				},
				{
					where: {
						[jobListingFields.id]: req.params.id
					}
				}
			)
			.then(result => {
				if (result.length) {
					res.send(middleware.response(200, null, 'Successfully updated the job.'));
				} else {
					res.send(middleware.response(500, null, 'Could not update the job.'));
				}
			})
			.catch(err => {
				middleware.errorHandling(err, res);
			});
	} catch (err) {
		next(err);
	}
};

admin.deleteJob = (req, res, next) => {
	try {
		model.jobListing
			.update(
				{
					[jobListingFields.isActive]: false
				},
				{
					where: {
						[jobListingFields.id]: req.params.id
					}
				}
			)
			.then(result => {
				if (result.length) {
					res.send(middleware.response(200, null, 'Deleted job successfully.'));
				} else {
					res.send(middleware.response(500, null, 'Could not delete the job.'));
				}
			})
			.catch(err => {
				middleware.errorHandling(err, res);
			});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	admin
};
