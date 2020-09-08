const sidebarWidth = 180;
const sidebarClosed = 50;

export default theme => ({
	topbar: {
		position: 'fixed',
		width: '100%',
		top: 0,
		left: 0,
		right: 'auto',
		zIndex: 10,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	topShift: {
		paddingTop: '4rem'
	},
	drawerPaper: {
		zIndex: 5,
		overflow: 'hidden',
		width: `${sidebarClosed}px`,
		'&:hover': {
			width: `${sidebarWidth}px`
		},
		borderRight: `1px solid ${theme.palette.dark.light}`,
		border: 'none',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		[theme.breakpoints.down('sm')]: {
			width: sidebarWidth
		}
	},
	collapsedDrawer: {
		width: '81px'
	},
	sidebar: {
		width: `${sidebarClosed}px`,
		overflow: 'hidden',
		'&:hover': {
			width: `${sidebarWidth}px`
		},
		transition: theme.transitions.create(['width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		[theme.breakpoints.down('sm')]: {
			width: sidebarWidth
		}
	},
	collapsedSidebar: {
		width: '80px'
	},
	content: {
		marginTop: '64px',
		backgroundColor: theme.palette.background.default,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	contentShift: {
		marginLeft: `${sidebarClosed}px`
	},
	container: {
		minHeight: '80vh',
		padding: theme.spacing(2)
	},
	mobileContainer: {
		padding: theme.spacing(2)
	}
});
