import React, { Component } from 'react';
import { setSnackbarRef, setDialogRef } from '../services';
import { withSnackbar } from 'notistack';
import { withDialog } from '../components/wrappers/DialogProvider';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RouteNames } from '../configs';
import { ErrorPage } from '../pages';
import { DashboardLayout } from '../layouts';

class Routes extends Component {
	componentDidMount() {
		setSnackbarRef(this.props);
		setDialogRef(this.props);
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path={'/'}
					component={props => {
						return <Redirect to={RouteNames.MAIN_ROUTE} />;
					}}
				/>

				<Route
					path={RouteNames.MAIN_ROUTE}
					component={props => {
						return <DashboardLayout {...props} />;
					}}
				/>

				<Route path={RouteNames.PAGE_NOT_FOUND} component={ErrorPage} />

				<Redirect from={'*'} to={RouteNames.PAGE_NOT_FOUND} />
			</Switch>
		);
	}
}

export default withSnackbar(withDialog(Routes));
