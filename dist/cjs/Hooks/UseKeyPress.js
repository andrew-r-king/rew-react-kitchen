"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyDown = exports.useKeyUp = void 0;
var react_1 = require("react");
var useKeyUp = function (handler) {
    (0, react_1.useEffect)(function () {
        document.addEventListener("keyup", handler);
        return function () {
            document.removeEventListener("keyup", handler);
        };
    }, [handler]);
};
exports.useKeyUp = useKeyUp;
var useKeyDown = function (handler) {
    (0, react_1.useEffect)(function () {
        document.addEventListener("keydown", handler);
        return function () {
            document.removeEventListener("keydown", handler);
        };
    }, [handler]);
};
exports.useKeyDown = useKeyDown;
//# sourceMappingURL=UseKeyPress.js.map