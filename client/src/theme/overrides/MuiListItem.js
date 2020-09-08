import palette from '../palette';

export default {
    root: {
        color: palette.common.white,
        '&$button:hover': {
            backgroundColor: palette.background.default
        },
        '&$selected': {
            backgroundColor: palette.background.default
        }
    }
};
