import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Slide, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

const DialogContext = React.createContext();

export const withDialog = RCTComponent =>
	React.forwardRef((props, ref) => (
		<DialogContext.Consumer>{context => <RCTComponent {...props} ref={ref} showDialog={context.showDialog} closeDialog={context.closeDialog} />}</DialogContext.Consumer>
	));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction={'down'} ref={ref} {...props} />;
});

class DialogProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			title: '',
			message: '',
			context: {
				showDialog: this._showDialog.bind(this),
				closeDialog: this._onClose.bind(this)
			},
			options: {
				positiveText: 'OK',
				negativeText: 'Cancel',
				cancelable: true
			}
		};
	}

	_showDialog(title, message, { onAgree, onCancel, ...options }) {
		this.setState(
			state => ({
				open: true,
				title,
				message,
				options: {
					positiveText: 'OK',
					negativeText: 'Cancel',
					cancelable: true,
					...options
				}
			}),
			() => {
				this.onAgree = onAgree;
				this.onCancel = onCancel;
			}
		);
	}

	_onAgree() {
		this._onClose();
		this.onAgree && this.onAgree();
	}

	_onCancel() {
		this._onClose();
		this.onCancel && this.onCancel();
	}

	_onClose() {
		this.setState({
			open: false
		});
	}

	render() {
		let { classes, children } = this.props;
		let {
			context,
			open,
			title,
			message,
			options: { cancelable, positiveText, negativeText }
		} = this.state;

		return (
			<DialogContext.Provider value={context}>
				{children}
				<Dialog open={open} fullWidth style={{ top: '-40%' }} TransitionComponent={Transition} maxWidth={'xs'} onClose={this._onCancel.bind(this)}>
					<DialogTitle>
						<Grid container alignItems={'center'}>
							<Typography className={classes.title} variant={'h4'}>
								{title}
							</Typography>
						</Grid>
					</DialogTitle>
					<DialogContent>
						<Typography variant={'body1'} component={'p'}>
							{message}
						</Typography>
					</DialogContent>
					<DialogActions>
						{cancelable && (
							<Button className={classes.actionButton} onClick={this._onCancel.bind(this)} color={'primary'} variant={'outlined'} size={'small'}>
								{negativeText}
							</Button>
						)}
						<Button className={classes.actionButton} onClick={this._onAgree.bind(this)} color={'primary'} variant={'contained'} size={'small'}>
							{positiveText}
						</Button>
					</DialogActions>
				</Dialog>
			</DialogContext.Provider>
		);
	}
}

export default withStyles(styles)(DialogProvider);
