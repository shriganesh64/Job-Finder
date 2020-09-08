import React, { Fragment, Component } from 'react';
import { SnackbarService } from '../../services';
import Styles from './styles';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/styles';
import { withWidth, Drawer } from '@material-ui/core';
import classNames from 'classnames';
import { AppName } from '../../configs';
import { Topbar, Sidebar, Footer } from '../../components';
import ClientRoutes from '../../routes/clientRoutes';

class DashboardLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOnline: true,
			isOpen: false
		};
	}

	componentDidMount() {
		window.addEventListener('online', () => {
			this.setState({ isOnline: true });
			SnackbarService.closeSnackbar();
		});
		window.addEventListener('offline', () => {
			this.setState({ isOnline: false });
			SnackbarService.enqueueSnackbar('NO INTERNET CONNECTION', {
				variant: 'error',
				persist: true,
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
			});
		});
	}

	componentWillUnmount() {
		window.removeEventListener('online', () => {
			this.setState({ isOnline: true });
			SnackbarService.closeSnackbar();
		});
		window.removeEventListener('offline', () => {
			this.setState({ isOnline: false });
			SnackbarService.enqueueSnackbar('NO INTERNET CONNECTION', {
				key: 'online-snackBar',
				variant: 'error',
				persist: true,
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
			});
		});
	}

	handleClose = () => {
		this.setState({ isOpen: false });
	};

	handleToggleOpen = () => {
		this.setState(state => ({ ...state, isOpen: !state.isOpen }));
	};

	render() {
		const { classes, width, logout } = this.props;
		const { isOpen } = this.state;

		const isMobile = ['xs', 'sm'].includes(width);
		// const isMobile = true;
		if (!isMobile && isOpen) this.setState({ isOpen: false });

		return (
			<Fragment>
				<Topbar
					className={classNames(classes.topbar)}
					isSidebarOpen={isOpen}
					isMobile={isMobile}
					onToggleSidebar={isMobile ? this.handleToggleOpen : () => {}}
					title={AppName}
					onLogout={logout}
				/>
				<Drawer
					anchor='left'
					classes={{
						paper: classNames(classes.drawerPaper, {
							[classes.topShift]: !isMobile
						})
					}}
					onClose={this.handleClose}
					open={isOpen}
					variant={isMobile ? 'temporary' : 'permanent'}
				>
					<Sidebar isMobile={isMobile} className={classes.sidebar} onClose={this.handleClose} />
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: !isMobile
					})}
				>
					<div
						className={classNames(classes.container, {
							[classes.mobileContainer]: isMobile
						})}
					>
						<ClientRoutes isMobile={isMobile} />
					</div>
					<Footer />
				</main>
			</Fragment>
		);
	}
}

// export default withStyles(Styles)(withWidth(DashboardLayout));
export default compose(withStyles(Styles), withWidth())(DashboardLayout);
