import React from 'react';
import { IconButton, Menu, MenuItem, Typography, Avatar, Tooltip, Grid } from '@material-ui/core';
import Styles from './styles';
import { withStyles } from '@material-ui/styles';

const CustomMenu = ({ options = [], menuIcon, tooltipTitle = 'Profile', classes }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Tooltip title={tooltipTitle}>
				<IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
					<Avatar src={menuIcon} className={classes.menuAvatar} />
				</IconButton>
			</Tooltip>
			<Menu
				id='long-menu'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					className: classes.menuPaper
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						{options.map((option, index) => {
							return (
								<MenuItem
									key={index}
									onClick={() => {
										handleClose();
										option.action();
									}}
								>
									<Avatar src={option.icon} variant={'square'} className={classes.menuItemAvatar} />
									<Typography variant={'h6'}>{option.actionName}</Typography>
								</MenuItem>
							);
						})}
					</Grid>
				</Grid>
			</Menu>
		</div>
	);
};

export default withStyles(Styles)(CustomMenu);
