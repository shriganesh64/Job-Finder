let _enqueueSnackbar = null;
let _closeSnackbar = null;

export const setSnackbarRef = ({ enqueueSnackbar, closeSnackbar }) => {
    _enqueueSnackbar = enqueueSnackbar;
    _closeSnackbar = closeSnackbar;
};

const SnackbarService = {
    enqueueSnackbar: (...rest) => {
        _enqueueSnackbar(...rest);
    },
    closeSnackbar: (...rest) => {
        _closeSnackbar(...rest);
    },
    errorSnackbar: () => {
        _enqueueSnackbar('Something went wrong please try again later.', { variant: 'error' });
    }
};

export default SnackbarService;
