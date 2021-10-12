"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBrowserInfo = void 0;
var react_1 = require("react");
var BrowserInfo = /** @class */ (function () {
    function BrowserInfo() {
        var _this = this;
        this.getDocumentElement = function () {
            if (_this.isEdge || _this.isChromium)
                return document.body;
            else
                return document.documentElement;
        };
        this.getClientHeight = function () {
            if (_this.isEdgeIE || _this.isChromium)
                return document.documentElement.clientHeight;
            else
                return _this.getDocumentElement().clientHeight;
        };
        this.getIeVersion = function (userAgent) {
            var ieVersion = -1;
            // Start by detecting IE versions 6-9 (React only supports 9+ natively anyway)
            if (/MSIE (\d+\.\d+);/.test(userAgent)) {
                var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                if (re.exec(userAgent) != null)
                    ieVersion = parseFloat(RegExp.$1);
            }
            // IE 10 is dected from navigator.appVersion instead of navigator.userAgent
            if (ieVersion === -1) {
                if (navigator.appVersion.indexOf("MSIE 10") !== -1)
                    ieVersion = 10;
            }
            // IE 11 is detected from navigator.userAgent again
            if (ieVersion === -1) {
                var trident = !!userAgent.match(/Trident\/7.0/);
                var rv = userAgent.indexOf("rv:11.0");
                if (trident && rv !== -1)
                    ieVersion = 11;
            }
            return ieVersion;
        };
        this.checkIfChromium = function () {
            // Check for "Chromium" in the plugin names
            if (navigator.plugins) {
                for (var i = 0; i < navigator.plugins.length; i++) {
                    // Although Opera uses Chromium in 2018+, they use the document.body element instead of document.documentElement
                    if (navigator.plugins[i].name.substr(0, 8) === "Chromium" && !_this.isOpera)
                        return true;
                }
            }
            return false;
        };
        var userAgent = navigator.userAgent;
        // Detects if MS Edge
        this.isEdge = /Edge/.test(userAgent);
        //this.docMode = document.documentMode;
        this.ieVersion = this.getIeVersion(userAgent);
        this.isIE = this.ieVersion !== -1;
        this.isEdgeIE = this.isEdge || this.isIE;
        this.isFirefox = /firefox/i.test(userAgent);
        // Opera uses Chromium now, but they use document.body, so they need to be excluded when Chromium is detected
        this.isOpera = /OPR/.test(userAgent);
        // Test for Electron (which uses Chromium as well)
        this.isElectron = /electron/i.test(userAgent);
        // Chromium uses document.documentElement for the clientHeight and document.body for everything else like with Edge
        this.isChromium = this.checkIfChromium();
    }
    return BrowserInfo;
}());
var useBrowserInfo = function () {
    var browser = react_1.useMemo(function () {
        var isServer = typeof window === "undefined";
        if (isServer)
            return;
        // can't be instantiated on the server (ie. NextJS usage), so it's done via hook
        return new BrowserInfo();
    }, []);
    return [browser];
};
exports.useBrowserInfo = useBrowserInfo;
//# sourceMappingURL=BrowserInfo.js.map