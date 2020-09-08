import { RouteNames } from '../configs';

let _history = null;

export const setHistoryRef = history => {
    _history = history;
};

function getBasePath(path = '') {
    return RouteNames.MAIN_ROUTE + path;
}

const RouterService = {
    pushRoute: (path, state) => {
        path = getBasePath(path);
        _history.push(path, state);
        window.scrollTo(0, 0);
    },
    replaceRoute: (path, state) => {
        path = getBasePath(path);
        _history.replace(path, state);
        window.scrollTo(0, 0);
    },
    goBack: () => {
        _history.goBack();
        window.scrollTo(0, 0);
    },
    openInNewWindow: path => {
        path = getBasePath(path);
        window.open(`${path}`, '_blank', 'toolbar=0', 'location=0', 'menubar=0');
    },
    closeCurrentWindow: () => {
        window.close();
    }
};

export default RouterService;
