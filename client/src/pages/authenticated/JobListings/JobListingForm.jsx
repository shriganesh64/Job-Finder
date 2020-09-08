import React from 'react';
import Styles from './styles';
import { FormValues, FormSchema } from './schema';
import { Grid, Typography, withStyles, FormControl, TextField, Button, MenuItem, Avatar } from '@material-ui/core';
import _ from 'underscore';
import validate from 'validate.js';
import { CustomSelect } from '../../../components';
import { JobTags, StatusCodes } from '../../../configs';
import { SnackbarService, BackDropService } from '../../../services';
import { CreateJob, UpdateJob } from '../../../apis/jobListings';

class JobListingForm extends React.Component {
	constructor(props) {
		super(props);

		this.isAdd = !!props?.isAdd;

		this.state = {
			values: {
				...FormValues,
				...props?.jobDetails,
				jobTags: !this.isAdd ? JSON.parse(props?.jobDetails?.['jobTags'] || '') || [] : []
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
		const { values, isValid } = this.state;
		const { onFinish = () => {} } = this.props;

		if (isValid) {
			let payload = {
					...values,
					jobTags: JSON.stringify(values.jobTags)
				},
				newValues = {
					...values,
					jobTags: JSON.stringify(values.jobTags)
				};

			delete payload?.id;
			let SubmitApi = this.isAdd ? CreateJob : UpdateJob;

			BackDropService.showBackDrop();
			SubmitApi(payload, values?.id)
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
			SnackbarService.enqueueSnackbar('Form fields are incorrect', { variant: 'error' });
		}
	}

	render() {
		const { values, isValid } = this.state;
		const { companiesList, classes } = this.props;

		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<Grid container spacing={2} justify={'flex-end'}>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Title</Typography>
						<FormControl fullWidth>
							<TextField
								required
								autoFocus
								margin={'dense'}
								value={values.title}
								variant={'outlined'}
								error={this.getErrorsOrHelper('title')}
								helperText={this.getErrorsOrHelper('title', true)}
								onChange={({ target: { value } }) => this.handleFieldChange('title', value)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Description</Typography>
						<FormControl fullWidth>
							<TextField
								required
								margin={'dense'}
								value={values.description}
								variant={'outlined'}
								multiline
								rows={2}
								error={this.getErrorsOrHelper('description')}
								helperText={this.getErrorsOrHelper('description', true)}
								onChange={({ target: { value } }) => this.handleFieldChange('description', value)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h6'}>CTC</Typography>
						<FormControl fullWidth>
							<TextField
								margin={'dense'}
								value={values.ctc}
								variant={'outlined'}
								error={this.getErrorsOrHelper('ctc')}
								helperText={this.getErrorsOrHelper('ctc', true)}
								onChange={({ target: { value } }) => this.handleFieldChange('ctc', value)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Experience</Typography>
						<FormControl fullWidth>
							<TextField
								required
								margin={'dense'}
								value={values.experience}
								variant={'outlined'}
								error={this.getErrorsOrHelper('experience')}
								helperText={this.getErrorsOrHelper('experience', true)}
								onChange={({ target: { value } }) => this.handleFieldChange('experience', value)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Company</Typography>
						<CustomSelect
							required
							margin={'dense'}
							value={values.companyId}
							error={this.getErrorsOrHelper('companyId')}
							renderValue={selectedValue => {
								let company = companiesList.find(item => item.id === selectedValue);

								return (
									<Grid container spacing={2} alignItems={'center'}>
										<Grid item>
											<Avatar
												src={company?.companyLogo}
												imgProps={{ style: { objectFit: 'contain' } }}
												variant={'rounded'}
												alt={'company-logo'}
												className={classes.companySmallIcon}
											/>
										</Grid>
										<Grid item>
											<Typography variant={'h5'}>{company?.companyName},</Typography>
										</Grid>
										<Grid item>
											<Typography variant={'subtitle2'}>{company?.location}</Typography>
										</Grid>
									</Grid>
								);
							}}
							onChange={({ target: { value } }) => this.handleFieldChange('companyId', value)}
						>
							{companiesList.map((company, index) => {
								return (
									<MenuItem key={index} value={company?.id}>
										<Typography variant={'h6'}>{company?.companyName}</Typography>
									</MenuItem>
								);
							})}
						</CustomSelect>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h6'}>Job Tags</Typography>
						<CustomSelect
							required
							multiple
							margin={'dense'}
							value={values.jobTags}
							renderValue={selectedValues => {
								return (
									<Grid container spacing={1}>
										{selectedValues.map((selectedValue, index) => {
											let tag = JobTags.find(item => item.value === selectedValue);
											return (
												<Grid item key={index}>
													<Typography variant={'subtitle2'}>
														{tag?.label}
														{index !== selectedValues.length - 1 && ','}
													</Typography>
												</Grid>
											);
										})}
									</Grid>
								);
							}}
							error={this.getErrorsOrHelper('jobTags')}
							onChange={({ target: { value } }) => this.handleFieldChange('jobTags', value)}
						>
							{JobTags.map((tag, index) => {
								return (
									<MenuItem key={index} value={tag.value}>
										<Typography variant={'h6'}>{tag.label}</Typography>
									</MenuItem>
								);
							})}
						</CustomSelect>
					</Grid>
					<Grid item>
						<Button size={'small'} variant={'contained'} color={'primary'} type={'submit'} disabled={!isValid}>
							{this.isAdd ? 'Add' : 'Update'}
						</Button>
					</Grid>
				</Grid>
			</form>
		);
	}
}

export default withStyles(Styles)(JobListingForm);
