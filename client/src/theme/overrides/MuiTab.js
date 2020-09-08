// Palette
import palette from '../palette';

export default {
    root: {
        height: '40px',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '14px',
        '@media (min-width: 960px)': {
            minWidth: '100px'
        },
        '&$selected': {
            fontWeight: 800
        }
    },
    label: {},
    labelContainer: {},
    textColorPrimary: {
        color: palette.common.white
    }
};
