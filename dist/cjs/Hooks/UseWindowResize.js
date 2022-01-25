"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowResize = void 0;
var react_1 = require("react");
var useWindowResize = function (handler) {
    (0, react_1.useEffect)(function () {
        window.addEventListener("resize", handler);
        return function () {
            window.removeEventListener("resize", handler);
        };
    }, [handler]);
};
exports.useWindowResize = useWindowResize;
//# sourceMappingURL=UseWindowResize.js.map