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
import React from "react";
import { useField } from "formik";
import AutoTextArea from "react-autosize-textarea";
var limitTextAreaInput = function (value, maxLength) {
    var outValue = value || "";
    return outValue.substr(0, maxLength);
};
var TextAreaInput = function (_a) {
    var name = _a.name, propsMaxLength = _a.maxLength, description = _a.description, showCount = _a.showCount, label = _a.label, required = _a.required, props = __rest(_a, ["name", "maxLength", "description", "showCount", "label", "required"]);
    var _b = useField(name), field = _b[0], meta = _b[1];
    var maxLength = propsMaxLength !== null && propsMaxLength !== void 0 ? propsMaxLength : 9999;
    var value = field.value;
    if (value !== undefined && value.length > maxLength) {
        value = limitTextAreaInput(value, maxLength);
    }
    else {
        value = value || "";
    }
    var className = "input-field textarea " + (meta.touched ? "touched " : "");
    return (React.createElement("div", { className: className },
        description && (React.createElement("p", null,
            description,
            !label && required && React.createElement("span", { className: "required" }, " *"))),
        label && React.createElement("label", { htmlFor: field.name }, label),
        React.createElement(AutoTextArea, __assign({}, field, props, { value: value })),
        showCount && value.length >= 0 && (React.createElement("div", { className: "count" },
            value.length,
            "/",
            maxLength)),
        meta.touched && meta.error && meta.error !== "" && React.createElement("p", { className: "invalid" }, meta.error)));
};
export { TextAreaInput };
//# sourceMappingURL=TextAreaInput.js.map