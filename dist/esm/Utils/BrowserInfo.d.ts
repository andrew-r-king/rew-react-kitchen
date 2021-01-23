declare class BrowserInfo {
    isEdge: boolean;
    ieVersion: number;
    isIE: boolean;
    isEdgeIE: boolean;
    isFirefox: boolean;
    isOpera: boolean;
    isElectron: boolean;
    isChromium: boolean;
    constructor();
    getDocumentElement: () => HTMLElement;
    getClientHeight: () => number;
    private getIeVersion;
    private checkIfChromium;
}
declare const useBrowserInfo: () => (BrowserInfo | undefined)[];
export { useBrowserInfo };
