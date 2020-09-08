const express = require('express'),
	adminCompanyDetailsRouter = express(),
	adminRouter = express.Router(),
	{ admin } = require('../controller/companyDetails');

adminRouter.get('/', admin.getAllCompanies);
adminRouter.post('/', admin.createCompany);
adminRouter.put('/:id', admin.updateCompany);
adminRouter.delete('/:id', admin.deleteCompany);

adminCompanyDetailsRouter.use('/company-details', adminRouter);

module.exports = {
	adminCompanyDetailsRouter
};
