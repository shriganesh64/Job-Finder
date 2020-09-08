import React, { Component } from 'react';
import Styles from './styles';
import { withStyles, DialogTitle, DialogContent, DialogActions, Dialog, Slide, Grid, Tooltip, IconButton, Typography, Divider } from '@material-ui/core';
import classNames from 'classnames';
import { Close } from '@material-ui/icons';

const CustomDialogContext = React.createContext();

export const withCustomDialog = RCTComponent =>
	React.forwardRef((props, ref) => (
		<CustomDialogContext.Consumer>{context => <RCTComponent {...props} ref={ref} showDialog={context.showDialog} closeDialog={context.closeDialog} />}</CustomDialogContext.Consumer>
	));

const Transition = React.forwardRef((props, ref) => {
	return <Slide direction={'up'} ref={ref} {...props} />;
});

class CustomDialogProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			options: {
				renderDialog: () => null,
				renderDialogActions: () => null,
				paperClassName: '',
				destructive: false,
				title: '',
				onClose: () => null,
				keepMounted: false,
				DialogProps: {}
			},
			context: {
				showDialog: this._showDialog.bind(this),
				closeDialog: this._closeDialog.bind(this)
			}
		};
	}

	_showDialog(params) {
		this.setState({ open: true, options: { ...params } });
	}

	_onClose() {
		let {
			options: { onClose }
		} = this.state;

		this._closeDialog();
		!!onClose && onClose();
	}

	_closeDialog() {
		this.setState({ open: false });
	}

	render() {
		let { children, classes } = this.props;
		let {
			open,
			options: { renderDialog, renderDialogActions, paperClassName, destructive, title, keepMounted, DialogProps },
			context
		} = this.state;

		return (
			<CustomDialogContext.Provider value={context}>
				{children}
				<Dialog
					open={open}
					PaperProps={{
						className: classNames(classes.paperContainer, { [paperClassName]: !!paperClassName })
					}}
					onClose={() => {
						!!destructive && this._onClose();
					}}
					TransitionComponent={Transition}
					keepMounted={keepMounted}
					{...DialogProps}
				>
					{!!destructive && (
						<DialogTitle className={classes.dialogTitle}>
							<Grid container spacing={2} justify={'space-between'} alignItems={'center'}>
								<Grid item>
									<Typography variant={'h4'}>
										<b>{title}</b>
									</Typography>
								</Grid>
								<Grid item>
									<Tooltip title={'Close'}>
										<IconButton size={'small'} onClick={this._onClose.bind(this)}>
											<Close className={classes.whiteColor} />
										</IconButton>
									</Tooltip>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
							</Grid>
						</DialogTitle>
					)}
					{!!renderDialog && <DialogContent>{renderDialog()}</DialogContent>}
					{!!renderDialogActions && (
						<DialogActions>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									{renderDialogActions()}
								</Grid>
							</Grid>
						</DialogActions>
					)}
				</Dialog>
			</CustomDialogContext.Provider>
		);
	}
}

export default withStyles(Styles)(CustomDialogProvider);
