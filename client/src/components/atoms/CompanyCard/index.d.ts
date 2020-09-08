import React from 'react';
import { PaperProps } from '@material-ui/core';

interface CompanyCardProps {
	name: String;
	logo: String;
	location: String;
	onEdit: Function;
	onDelete: Function;
	PaperProps?: PaperProps;
}

export default class CompanyCard extends React.Component<CompanyCardProps> {}
