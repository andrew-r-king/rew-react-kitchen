"use strict";
// https://stackoverflow.com/a/8831937
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
var hashString = function (inString) {
    var hash = 0;
    if (inString.length === 0) {
        return hash;
    }
    for (var i = 0; i < inString.length; ++i) {
        var char = inString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to a 32-bit integer
    }
    return hash;
};
exports.hashString = hashString;
//# sourceMappingURL=Hash.js.map