"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputLabel = void 0;
var react_1 = __importDefault(require("react"));
var InputLabel = function (props) {
    return (react_1.default.createElement("label", { htmlFor: props.for },
        props.label,
        " ",
        props.required && react_1.default.createElement("span", { className: "required" }, " *")));
};
exports.InputLabel = InputLabel;
//# sourceMappingURL=InputLabel.js.map