import React from 'react';
import Styles from './styles';
import { withStyles, Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core';
import { WorkOutline, LocationOnOutlined, DescriptionOutlined, EditOutlined, DeleteOutlined } from '@material-ui/icons';
import { DialogService } from '../../../services';
import { JobTags } from '../../../configs';

class JobListingCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		let {
			classes,
			jobDetails: {
				title,
				description,
				ctc,
				experience,
				jobTags,
				companyDetail: { companyLogo, companyName, location }
			},
			onEdit = () => {},
			onDelete = () => {}
		} = this.props;
		jobTags = JSON.parse(jobTags);
		jobTags = (jobTags || []).map(item => {
			return JobTags.find(ite => ite.value === item)?.label;
		});

		return (
			<Paper className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant={'h4'}>
									<b>{title}</b>
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant={'subtitle2'}>{companyName}</Typography>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2} alignItems={'center'}>
									<Grid item xs={4}>
										<Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
											<Grid item>
												<WorkOutline className={classes.smallIcon} />
											</Grid>
											<Grid item>
												<Typography variant={'subtitle2'}>{experience} Yrs</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={4}>
										<Typography variant={'subtitle2'}>₹ {ctc || 'Not Disclosed'}</Typography>
									</Grid>
									<Grid item xs={4}>
										<Grid container spacing={1} wrap={'nowrap'}>
											<Grid item>
												<LocationOnOutlined className={classes.smallIcon} />
											</Grid>
											<Grid item>
												<Typography variant={'subtitle2'}>{location}</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={1}>
										<DescriptionOutlined className={classes.smallIcon} />
									</Grid>
									<Grid item xs={11}>
										<Typography variant={'subtitle2'}>{description}</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={1}>
									{(jobTags || []).map((tag, index) => {
										return (
											<Grid item key={index}>
												<Grid container spacing={1} alignItems={'center'}>
													<Grid item>
														<Typography variant={'subtitle2'}>{tag}</Typography>
													</Grid>
													{index !== (jobTags || []).length - 1 && (
														<Grid item>
															<Typography variant={'subtitle2'}>.</Typography>
														</Grid>
													)}
												</Grid>
											</Grid>
										);
									})}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<Grid container spacing={2}>
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
													DialogService.showDialog('Delete Job', `Are you sure to delete "${title}" job?`, {
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
							<Grid item xs={12}>
								<Paper elevation={0} style={{ backgroundImage: `url(${companyLogo})` }} className={classes.logo} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default withStyles(Styles)(JobListingCard);
