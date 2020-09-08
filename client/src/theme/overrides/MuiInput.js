import palette from '../palette';

export default {
    root: {
        backgroundColor: 'transparent'
    },
    underline: {
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid ${palette.disabled.light}`
        },
        '&:before': {
            borderBottom: `1px solid ${palette.disabled.dark}`
        },
        '&:after': {
            borderBottom: `1.5px solid ${palette.tertiary.main}`
        }
    }
};
