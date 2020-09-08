interface RouterServiceProps {
    pushRoute: (path: String, state: any) => void;
    replaceRoute: (path: String, state: any) => void;
    goBack: () => void;
    openInNewWindow: (path: String) => void;
    closeCurrentWindow: () => void;
}

declare const RouterService: RouterServiceProps;

export const setHistoryRef: (history: any) => void;
export default RouterService;
