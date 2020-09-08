import palette from '../palette';

export default {
    root: {
        background: palette.input.background,
        fontFamily: 'Poppins',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.tertiary.main
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.tertiary.main
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${palette.danger.main}`
        }
    },
    input: {
        padding: '20.5px 14px'
    }
};
