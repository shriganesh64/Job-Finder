import React from 'react';

interface JobListingCardProps {
	jobDetails: {
		title: String;
		description: String;
		ctc: String;
		experience: String;
		jobTags: Array;
		companyDetails: {
			companyLogo: String;
			companyName: String;
			location: String;
		};
	};
	onEdit: Function;
	onDelete: Function;
}

export default class JobListingCard extends React.Component<JobListingCardProps> {}
