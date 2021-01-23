import { useEffect } from "react";
var useKeyUp = function (handler) {
    useEffect(function () {
        document.addEventListener("keyup", handler);
        return function () {
            document.removeEventListener("keyup", handler);
        };
    }, [handler]);
};
var useKeyDown = function (handler) {
    useEffect(function () {
        document.addEventListener("keydown", handler);
        return function () {
            document.removeEventListener("keydown", handler);
        };
    }, [handler]);
};
export { useKeyUp, useKeyDown };
//# sourceMappingURL=UseKeyPress.js.map