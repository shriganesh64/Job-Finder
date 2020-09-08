const middleware = require('../middleware');
const model = require('../models'),
	{
		modelFields: { companyDetailsFields }
	} = model;

let admin = {};

admin.getAllCompanies = (req, res, next) => {
	try {
		model.companyDetails
			.findAll({
				where: {
					[companyDetailsFields.isActive]: true
				},
				order: [['createdAt', 'DESC']]
			})
			.then(result => {
				if (result.length) {
					res.send(middleware.response(200, result));
				} else {
					res.send(middleware.response(404, null, 'No companies found.'));
				}
			})
			.catch(err => {
				middleware.errorHandling(err, res);
			});
	} catch (err) {
		next(err);
	}
};

admin.createCompany = (req, res, next) => {
	try {
		model.companyDetails
			.create({
				...req.body
			})
			.then(result => {
				if (result.id) {
					res.send(middleware.response(200, null, 'Company created successfully.'));
				} else {
					res.send(middleware.response(500, null, "Couldn't create company."));
				}
			})
			.catch(err => {
				middleware.errorHandling(err, res);
			});
	} catch (err) {
		next(err);
	}
};

admin.updateCompany = (req, res, next) => {
	try {
		model.companyDetails
			.update(
				{
					...req.body
				},
				{
					where: {
						[companyDetailsFields.id]: req.params.id
					}
				}
			)
			.then(result => {
				if (result.length) {
					res.send(middleware.response(200, null, 'Successfully updated the company.'));
				} else {
					res.send(middleware.response(500, null, 'Could not update the company.'));
				}
			})
			.catch(err => {
				middleware.errorHandling(err, res);
			});
	} catch (err) {
		next(err);
	}
};

admin.deleteCompany = (req, res, next) => {
	try {
		model.companyDetails
			.update(
				{
					[companyDetailsFields.isActive]: false
				},
				{
					where: {
						[companyDetailsFields.id]: req.params.id
					}
				}
			)
			.then(result => {
				if (result.length) {
					res.send(middleware.response(200, null, 'Deleted company successfully.'));
				} else {
					res.send(middleware.response(500, null, 'Could not delete the company.'));
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
