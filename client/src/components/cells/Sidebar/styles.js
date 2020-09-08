import palette from '../../../theme/palette';

const ProfilePicDimension = 130;
const DarkColor = palette.primary.main;
const WhiteColor = palette.common.white;
const DisabledColor = palette.text.disabled;
const ActiveState = {
	borderLeft: `2px solid ${DarkColor}`,
	backgroundColor: 'transparent',
	'& $listItemText': {
		color: DarkColor,
		fontWeight: 'bold'
	},
	'& $listItemIcon': {
		color: DarkColor,
		marginLeft: '-2px'
	}
};

export default theme => ({
	root: {
		backgroundColor: theme.palette.dark.dark,
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	profilePic: { width: ProfilePicDimension, height: ProfilePicDimension, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) },
	textBold: {
		fontWeight: 'bold'
	},
	userDetails: { color: DisabledColor },
	bioText: {},
	menuList: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		overflowX: 'hidden',
		overflowY: 'auto'
	},
	listItem: {
		cursor: 'pointer',
		marginTop: theme.spacing(1),
		'&:hover': {
			...ActiveState
		}
	},
	subListItem: {
		marginLeft: theme.spacing(1),
		width: 'auto'
	},
	sectionActiveListItem: {
		backgroundColor: 'transparent',
		'& $listItemText': {
			color: WhiteColor,
			fontWeight: 'bold'
		},
		'& $listItemIcon': {
			color: DarkColor
		}
	},
	activeListItem: {
		...ActiveState
	},
	listItemIcon: {
		marginRight: '2px',
		color: DisabledColor,
		transition: theme.transitions.create(['color'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	listItemText: {
		color: DisabledColor,
		fontWeight: 'bold',
		whiteSpace: 'nowrap',
		transition: theme.transitions.create(['color', 'font-weight'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	formControl: {
		marginLeft: theme.spacing(2),
		minWidth: 60,
		marginRight: 'auto'
	},
	language: {
		bottom: 10,
		position: 'fixed'
	},
	icon: {
		width: '24px'
	}
});
