let _instance = null;

export const setDialogRef = instance => {
    _instance = instance;
};

const DialogService = {
    showDialog: (...rest) => {
        _instance._showDialog(...rest);
    },
    closeDialog: (...rest) => {
        _instance._closeDialog(...rest);
    }
};

export default DialogService;
