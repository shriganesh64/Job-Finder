import React from 'react';
import Styles from './styles';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { JobListingCard, CustomToolbar } from '../../../components';
import { GetJobListings, DeleteJob } from '../../../apis/jobListings';
import { GetCompanies } from '../../../apis/companies';
import { SnackbarService, CustomDialogService, BackDropService } from '../../../services';
import { StatusCodes } from '../../../configs';
import JobListingForm from './JobListingForm';

class JobListings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			jobListings: [],
			companiesList: []
		};
	}

	componentDidMount() {
		this.getJobListings();
		this.getCompanies();
	}

	getJobListings = () => {
		this.toggleLoading();
		GetJobListings()
			.then(({ statusCode, result }) => {
				this.toggleLoading();
				if (statusCode === StatusCodes.SUCCESS) {
					this.setState({
						jobListings: [...result.data]
					});
				} else {
					SnackbarService.enqueueSnackbar(result.message, { variant: 'error' });
				}
			})
			.catch(err => {
				if (this.state.loading) this.toggleLoading();
				SnackbarService.errorSnackbar();
			});
	};

	getCompanies = () => {
		this.toggleLoading();
		GetCompanies()
			.then(({ result, statusCode }) => {
				this.toggleLoading();
				if (statusCode === StatusCodes.SUCCESS) {
					this.setState({ companiesList: [...result.data] });
				}
			})
			.catch(err => {
				if (this.state.loading) this.toggleLoading();
			});
	};

	toggleLoading = () => {
		this.setState(state => ({ ...state, loading: !state.loading }));
	};

	onEdit = (index, newValues) => {
		const { jobListings } = this.state;
		jobListings.splice(index, 1, newValues);
		this.setState({ jobListings });
	};

	onDelete = (index, id) => {
		const { jobListings } = this.state;

		this.toggleLoading();
		DeleteJob(id)
			.then(({ statusCode, result }) => {
				this.toggleLoading();
				if (statusCode === StatusCodes.SUCCESS) {
					jobListings.splice(index, 1);
					this.setState({ jobListings }, () => {
						SnackbarService.enqueueSnackbar(result.message, { variant: 'success' });
					});
				} else {
					SnackbarService.enqueueSnackbar(result.message, { variant: 'error' });
				}
			})
			.catch(err => {
				if (this.state.loading) this.toggleLoading();
				SnackbarService.errorSnackbar();
			});
	};

	componentWillUnmount() {
		CustomDialogService.closeDialog();
		BackDropService.closeBackDrop();
	}

	render() {
		const { loading, jobListings, companiesList } = this.state;

		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<CustomToolbar
						title={'Job Listings'}
						titleSize={'h3'}
						loading={loading}
						onRefresh={() => {
							this.getJobListings();
							this.getCompanies();
						}}
						onAdd={() => {
							CustomDialogService.showDialog({
								destructive: true,
								title: 'Add Job',
								renderDialog: () => <JobListingForm isAdd companiesList={companiesList} onFinish={() => CustomDialogService.closeDialog()} />,
								DialogProps: { scroll: 'body' }
							});
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						{jobListings.map((jobDetails, index) => {
							return (
								<Grid item xs={12} md={6} key={index}>
									<JobListingCard
										jobDetails={jobDetails}
										onEdit={() => {
											CustomDialogService.showDialog({
												destructive: true,
												title: 'Edit Job',
												renderDialog: () => (
													<JobListingForm
														jobDetails={jobDetails}
														companiesList={companiesList}
														onFinish={newValues => {
															this.onEdit(index, newValues);
															CustomDialogService.closeDialog();
														}}
													/>
												),
												DialogProps: { scroll: 'body' }
											});
										}}
										onDelete={() => this.onDelete(index, jobDetails?.id)}
									/>
								</Grid>
							);
						})}
						{!jobListings.length && (
							<Grid item xs={12}>
								<Typography variant={'h5'} align={'center'}>
									No Jobs Found
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(Styles)(JobListings);
