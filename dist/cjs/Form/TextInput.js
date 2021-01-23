"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInput = exports.NumberTextInput = exports.PasswordInput = exports.PhoneInput = exports.EmailInput = exports.TextInput = void 0;
var react_1 = __importDefault(require("react"));
var formik_1 = require("formik");
var InputLabel_1 = require("./InputLabel");
function makeInput(type, defaultPlaceholder, mutator) {
    if (defaultPlaceholder === void 0) { defaultPlaceholder = ""; }
    return function (props) {
        var label = props.label, descriptor = props.descriptor, required = props.required, rightLabel = props.rightLabel, error = props.error, placeholder = props.placeholder, inputProps = __rest(props, ["label", "descriptor", "required", "rightLabel", "error", "placeholder"]);
        var _a = formik_1.useField(props.name), field = _a[0], meta = _a[1], helpers = _a[2];
        var touched = meta.touched && (meta.value === "" || meta.value === 0);
        var className = "input-field " + type + " " + (touched ? "touched " : "");
        return (react_1.default.createElement("div", { className: className },
            descriptor && react_1.default.createElement("p", null, descriptor),
            label && !rightLabel && react_1.default.createElement(InputLabel_1.InputLabel, { label: label, for: field.name, required: required }),
            react_1.default.createElement("input", __assign({}, field, inputProps, { type: type, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : defaultPlaceholder, onChange: function (ev) {
                    field.onChange(ev);
                    if (mutator)
                        helpers.setValue(mutator(props, ev.target.value));
                } })),
            label && rightLabel && react_1.default.createElement("span", null, label),
            react_1.default.createElement("div", { className: "flare" }),
            meta.touched && meta.error && meta.error !== "" && react_1.default.createElement("p", { className: "invalid" }, meta.error)));
    };
}
var TextInput = makeInput("text", "");
exports.TextInput = TextInput;
var EmailInput = makeInput("email", "name@company.com");
exports.EmailInput = EmailInput;
var PhoneInput = makeInput("phone", "(555) 555-5555");
exports.PhoneInput = PhoneInput;
var PasswordInput = makeInput("password");
exports.PasswordInput = PasswordInput;
var NumberInput = makeInput("number", "Number");
exports.NumberInput = NumberInput;
var NumberTextInput = makeInput("text", "", function (props, value) {
    var _a, _b;
    var min = (_a = props.min) !== null && _a !== void 0 ? _a : 0;
    var max = (_b = props.max) !== null && _b !== void 0 ? _b : 999999999999;
    var valueNumber = parseInt(value);
    var isInvalid = isNaN(valueNumber);
    var clampedValue = Math.max(Math.min(valueNumber, max), min);
    return isInvalid ? "" : clampedValue;
});
exports.NumberTextInput = NumberTextInput;
//# sourceMappingURL=TextInput.js.map