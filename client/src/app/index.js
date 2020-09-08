import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, withStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import 'react-perfect-scrollbar/dist/css/styles.css';
import theme from '../theme';
import '../assets/scss/index.scss';
import { DialogProvider, BackDropProvider, CustomDialogProvider } from '../components';
import { setDialogRef, setHistoryRef, setBackDropRef, setCustomDialogRef } from '../services';
import Routes from '../routes';

const Styles = {
	whiteColor: { color: theme.palette.common.white }
};

class App extends Component {
	render() {
		let { classes } = this.props;

		return (
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					classes={{ variantSuccess: classes.whiteColor, variantError: classes.whiteColor, variantInfo: classes.whiteColor, variantWarning: classes.whiteColor }}
					preventDuplicate
					maxSnack={4}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					autoHideDuration={1800}
				>
					<BackDropProvider
						ref={ref => {
							setBackDropRef(ref);
						}}
					>
						<DialogProvider
							ref={ref => {
								setDialogRef(ref);
							}}
						>
							<CustomDialogProvider ref={ref => setCustomDialogRef(ref)}>
								<BrowserRouter ref={ref => setHistoryRef(ref.history)}>
									<Routes />
								</BrowserRouter>
							</CustomDialogProvider>
						</DialogProvider>
					</BackDropProvider>
				</SnackbarProvider>
			</ThemeProvider>
		);
	}
}

export default withStyles(Styles)(App);
