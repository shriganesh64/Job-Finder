export default theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.dark.light}`,
        background: theme.palette.dark.dark,
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        zIndex: theme.zIndex.appBar
    },
    toolbar: {
        minHeight: 'auto',
        width: '100%'
    },
    avatarImg: {
        objectFit: 'contain'
    },
    appLogo: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '4rem',
        height: '2rem',
        borderRadius: 0
    },
    appLogoMobile: {
        width: '5rem'
    },
    title: {
        fontWeight: 'bold'
    },
    menuButton: {
        marginLeft: '-4px'
    },
    menuIcon: {
        color: theme.palette.common.white
    },
    notificationsButton: {
        marginLeft: 'auto'
    },
    signOutButton: {
        marginLeft: theme.spacing.unit
    },
    optionText: {
        marginTop: '2px',
        marginLeft: '5px'
    }
});
