import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { RouteNames } from '../configs';
import { Companies, JobListings } from '../pages';

class ClientRoutes extends Component {
	render() {
		let {
			match: { path }
		} = this.props;

		return (
			<Switch>
				<Route
					exact
					path={path}
					component={() => {
						return <Redirect to={path + RouteNames.COMPANIES} />;
					}}
				/>

				<Route
					exact
					path={`${path}${RouteNames.COMPANIES}`}
					component={props => {
						return (
							<Switch>
								<Route path={path} component={props => <Companies {...this.props} {...props} />} />
								<Redirect to={path} />
							</Switch>
						);
					}}
				/>

				<Route
					exact
					path={`${path}${RouteNames.JOB_LISTINGS}`}
					component={props => {
						return (
							<Switch>
								<Route path={path} component={props => <JobListings {...this.props} {...props} />} />
								<Redirect to={path} />
							</Switch>
						);
					}}
				/>

				<Redirect from={`${path}/*`} to={RouteNames.PAGE_NOT_FOUND} />
			</Switch>
		);
	}
}

export default withRouter(ClientRoutes);
