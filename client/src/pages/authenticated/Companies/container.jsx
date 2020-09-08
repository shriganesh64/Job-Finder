import React from 'react';
import { Grid, withStyles, Typography } from '@material-ui/core';
import Styles from './styles';
import { CustomToolbar, CompanyCard } from '../../../components';
import { GetCompanies, DeleteCompany } from '../../../apis/companies';
import { SnackbarService, CustomDialogService, BackDropService } from '../../../services';
import { StatusCodes } from '../../../configs';
import CompanyForm from './CompanyForm';

class Companies extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			companiesList: []
		};
	}

	componentDidMount() {
		this.getCompanies();
	}

	getCompanies = () => {
		this.toggleLoading();
		GetCompanies()
			.then(({ result, statusCode }) => {
				this.toggleLoading();
				if (statusCode === StatusCodes.SUCCESS) {
					this.setState({ companiesList: [...result.data] });
				} else {
					SnackbarService.enqueueSnackbar(result.message, { variant: 'error' });
				}
			})
			.catch(err => {
				if (this.state.loading) this.toggleLoading();
				SnackbarService.errorSnackbar();
			});
	};

	toggleLoading = () => {
		this.setState(state => ({ ...state, loading: !state.loading }));
	};

	onEdit = (index, dataChanged) => {
		let { companiesList } = this.state;
		companiesList.splice(index, 1, dataChanged);
		this.setState({ companiesList });
	};

	onDelete = (index, id) => {
		let { companiesList } = this.state;
		this.toggleLoading();
		DeleteCompany(id)
			.then(({ statusCode, result }) => {
				this.toggleLoading();
				if (statusCode === StatusCodes.SUCCESS) {
					companiesList.splice(index, 1);
					this.setState({ companiesList }, () => SnackbarService.enqueueSnackbar(result.message, { variant: 'success' }));
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
		const { loading, companiesList } = this.state;

		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<CustomToolbar
						title={'Companies'}
						titleSize={'h3'}
						loading={loading}
						onRefresh={this.getCompanies}
						onAdd={() => {
							CustomDialogService.showDialog({
								destructive: true,
								title: 'Add Company',
								renderDialog: () => <CompanyForm isAdd onFinish={() => CustomDialogService.closeDialog()} />
							});
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						{companiesList.map((company, index) => {
							return (
								<Grid item xs={12} sm={6} md={3} key={index}>
									<CompanyCard
										name={company.companyName || ''}
										location={company.location || ''}
										logo={company?.companyLogo || ''}
										onEdit={() => {
											CustomDialogService.showDialog({
												destructive: true,
												title: 'Edit Company',
												renderDialog: () => (
													<CompanyForm
														companyDetails={company}
														onFinish={newValues => {
															this.onEdit(index, newValues);
															CustomDialogService.closeDialog();
														}}
													/>
												)
											});
										}}
										onDelete={() => this.onDelete(index, company?.id)}
									/>
								</Grid>
							);
						})}
						{!companiesList.length && (
							<Grid item xs={12}>
								<Typography variant={'h5'} align={'center'}>
									No Companies Found
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(Styles)(Companies);
