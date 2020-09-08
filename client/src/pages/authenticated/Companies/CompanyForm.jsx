import React from 'react';
import Styles from './styles';
import { Grid, withStyles, Typography, FormControl, TextField, Button } from '@material-ui/core';
import { FormValues, FormSchema } from './schema';
import _ from 'underscore';
import validate from 'validate.js';
import { SnackbarService, BackDropService } from '../../../services';
import { CreateCompany, UpdateCompany } from '../../../apis/companies';
import { StatusCodes } from '../../../configs';

class CompanyForm extends React.Component {
	constructor(props) {
		super(props);

		this.isAdd = !!props?.isAdd;

		this.state = {
			values: {
				...FormValues,
				...props?.companyDetails
			},
			errors: {},
			touched: {},
			isValid: false
		};
	}

	validateForm = _.debounce(() => {
		let newState = this.state;
		let values = { ...newState.values };

		let errors = validate(values, FormSchema);
		newState.errors = errors || {};
		newState.isValid = errors ? false : true;
		this.setState(newState);
	}, 300);

	handleFieldChange = (key = '', value = '') => {
		let newState = { ...this.state };

		newState.values[key] = value;
		newState.touched[key] = true;
		this.setState(newState, this.validateForm);
	};

	getErrorsOrHelper = (key, helper = false) => {
		const { errors = {}, touched = {} } = this.state;
		return !!helper ? !!errors[key] && touched[key] && errors[key].join(', ') : !!errors[key] && touched[key];
	};

	onSubmit(e) {
		e.preventDefault();
		const { onFinish = () => {} } = this.props;
		const { values, isValid } = this.state;
		if (isValid) {
			let payload = {
					...values
				},
				newValues = {
					...values
				};
			delete payload?.id;
			let SubmitApi = this.isAdd ? CreateCompany : UpdateCompany;
			BackDropService.showBackDrop();
			SubmitApi(payload, values?.id || '')
				.then(({ statusCode, result }) => {
					BackDropService.closeBackDrop();
					if (statusCode === StatusCodes.SUCCESS) {
						this.setState(
							{
								values: {
									...FormValues
								},
								errors: {},
								touched: {},
								isValid: false
							},
							() => {
								SnackbarService.enqueueSnackbar(result.message, { variant: 'success' });
								onFinish(newValues);
							}
						);
					} else {
						SnackbarService.enqueueSnackbar(result.message, { variant: 'error' });
					}
				})
				.catch(err => {
					BackDropService.closeBackDrop();
					SnackbarService.errorSnackbar();
				});
		} else {
			SnackbarService.enqueueSnackbar('Form fields are incorrect.', { variant: 'error' });
		}
	}

	render() {
		const { values, isValid } = this.state;

		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<Grid container spacing={2} justify={'flex-end'}>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Company Name</Typography>
						<FormControl fullWidth>
							<TextField
								required
								autoFocus
								value={values.companyName}
								variant={'outlined'}
								margin={'dense'}
								error={this.getErrorsOrHelper('companyName')}
								helperText={this.getErrorsOrHelper('companyName', true)}
								onChange={({ target: { value } }) => this.handleFieldChange('companyName', value)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Company Logo</Typography>
						<FormControl fullWidth>
							<TextField
								required
								value={values.companyLogo}
								variant={'outlined'}
								margin={'dense'}
								type={'url'}
								error={this.getErrorsOrHelper('companyLogo')}
								helperText={this.getErrorsOrHelper('companyLogo', true)}
								onChange={({ target: { value } }) => this.handleFieldChange('companyLogo', value)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Company Location</Typography>
						<FormControl fullWidth>
							<TextField
								required
								value={values.location}
								variant={'outlined'}
								margin={'dense'}
								error={this.getErrorsOrHelper('location')}
								helperText={this.getErrorsOrHelper('location', true)}
								onChange={({ target: { value } }) => this.handleFieldChange('location', value)}
							/>
						</FormControl>
					</Grid>
					<Grid item>
						<Button size={'small'} type={'submit'} variant={'contained'} color={'primary'} disabled={!isValid}>
							{this.isAdd ? 'Add' : 'Update'}
						</Button>
					</Grid>
				</Grid>
			</form>
		);
	}
}

export default withStyles(Styles)(CompanyForm);
