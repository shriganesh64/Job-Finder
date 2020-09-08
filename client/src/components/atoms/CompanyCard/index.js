import React from 'react';
import Styles from './styles';
import { Grid, withStyles, Typography, Paper, IconButton, Tooltip } from '@material-ui/core';
import { LocationOnOutlined, EditOutlined, DeleteOutlined } from '@material-ui/icons';
import { DialogService } from '../../../services';

class CompanyCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { classes, name = '', logo = '', location = '', onEdit = () => {}, onDelete = () => {}, PaperProps } = this.props;

		return (
			<Paper className={classes.paper} {...PaperProps}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Paper style={{ backgroundImage: `url(${logo})` }} className={classes.logo} variant={'outlined'} />
					</Grid>
					<Grid item xs={12}>
						<Typography variant={'h4'}>
							<b>{name}</b>
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1} alignItems={'center'}>
							<Grid item>
								<LocationOnOutlined className={classes.whiteColor} />
							</Grid>
							<Grid item>
								<Typography variant={'h6'}>{location}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2} alignItems={'center'} justify={'flex-end'}>
							<Grid item>
								<Tooltip title={'Edit'}>
									<IconButton size={'small'} onClick={onEdit}>
										<EditOutlined className={classes.whiteColor} />
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid item>
								<Tooltip title={'Delete'}>
									<IconButton
										size={'small'}
										onClick={() => {
											DialogService.showDialog('Delete Company', `Are you sure to delete "${name}" company?`, {
												destructive: true,
												onAgree: () => onDelete()
											});
										}}
									>
										<DeleteOutlined className={classes.whiteColor} />
									</IconButton>
								</Tooltip>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default withStyles(Styles)(CompanyCard);
