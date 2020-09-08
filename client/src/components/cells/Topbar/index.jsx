import React, { Component, Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles, IconButton, Grid, Tooltip } from '@material-ui/core';
import { Toolbar, Typography } from '@material-ui/core';
import styles from './styles';
import { Menu } from '@material-ui/icons';
import { RouteNames } from '../../../configs';

class Topbar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { classes, className, title, isMobile, onToggleSidebar } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<Fragment>
				<div className={rootClassName}>
					<Toolbar className={classes.toolbar}>
						{isMobile && (
							<IconButton className={classes.menuButton} onClick={onToggleSidebar} variant='text'>
								<Menu className={classes.menuIcon} />
							</IconButton>
						)}
						<Grid container alignItems={'center'} justify={'flex-start'}>
							<Tooltip title={'Job Finder'}>
								<Grid item component={NavLink} to={RouteNames.MAIN_ROUTE + RouteNames.COMPANIES}>
									<Grid container alignItems={'center'}>
										<Typography variant={isMobile ? 'subtitle2' : 'h4'} className={classes.title}>
											{title}
										</Typography>
									</Grid>
								</Grid>
							</Tooltip>
						</Grid>
					</Toolbar>
				</div>
			</Fragment>
		);
	}
}

Topbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	isMobile: PropTypes.bool,
	onToggleSidebar: PropTypes.func,
	title: PropTypes.string
};

Topbar.defaultProps = {
	onToggleSidebar: () => {}
};

export default compose(withRouter, withStyles(styles))(Topbar);
