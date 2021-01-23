import { useEffect } from "react";
var useWindowResize = function (handler) {
    useEffect(function () {
        window.addEventListener("resize", handler);
        return function () {
            window.removeEventListener("resize", handler);
        };
    }, [handler]);
};
export { useWindowResize };
//# sourceMappingURL=UseWindowResize.js.map