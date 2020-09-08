// Palette
import palette from '../palette';

export default {
    outlined: {},
    text: {
        textTransform: 'capitalize'
    },
    contained: {
        backgroundColor: palette.common.white,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: palette.common.neutral
        },
        '&:disabled': {
            backgroundColor: palette.disabled.main,
            color: palette.common.white
        }
    }
};
