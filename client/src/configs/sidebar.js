import { BusinessOutlined, Business, WorkOutline, Work } from '@material-ui/icons';
import { RouteNames } from './routes';

export const SidebarItems = [
	{
		title: 'Companies',
		icon: BusinessOutlined,
		activeIcon: Business,
		path: RouteNames.COMPANIES
	},
	{
		title: 'Job Listings',
		icon: WorkOutline,
		activeIcon: Work,
		path: RouteNames.JOB_LISTINGS
	}
];
