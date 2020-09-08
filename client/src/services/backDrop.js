let _instance = null;

export const setBackDropRef = instance => {
    _instance = instance;
};

const BackDropService = {
    showBackDrop: (...rest) => {
        _instance._showBackDrop(...rest);
    },
    closeBackDrop: (...rest) => {
        _instance._closeBackDrop(...rest);
    }
};

export default BackDropService;
