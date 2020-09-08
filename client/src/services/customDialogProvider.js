let _instance = null;

export const setCustomDialogRef = instance => {
    _instance = instance;
};

const CustomDialogService = {
    showDialog: (...rest) => {
        _instance._showDialog(...rest);
    },
    closeDialog: (...rest) => {
        _instance._closeDialog(...rest);
    }
};

export default CustomDialogService;
