import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';

interface SnackbarServiceProps {
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
    errorSnackbar: () => void;
}

declare const SnackbarService: SnackbarServiceProps;

export const setSnackbarRef: (instance: SnackbarServiceProps) => {};
export default SnackbarService;
