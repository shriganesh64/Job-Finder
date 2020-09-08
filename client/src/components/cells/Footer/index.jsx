import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Moment from 'moment';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Divider, Typography } from '@material-ui/core';
import { AppName } from '../../../configs';

// Component styles
const styles = theme => ({
	root: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(2)
	},

	company: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
});

class Footer extends Component {
	render() {
		const { classes, className } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<Divider />
				<Typography className={classes.company} variant='body1'>
					&copy; {AppName} {Moment().format('YYYY')}
				</Typography>
			</div>
		);
	}
}

Footer.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
