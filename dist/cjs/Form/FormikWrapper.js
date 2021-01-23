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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFormLocale = exports.useFormikForm = exports.Form = void 0;
var react_1 = __importStar(require("react"));
var formik_1 = require("formik");
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return formik_1.Form; } });
var Yup = __importStar(require("yup"));
function setFormLocale(locale) {
    Yup.setLocale(locale);
}
exports.setFormLocale = setFormLocale;
function useFormikForm(InnerForm, initialValues, dependencies) {
    var WrappedForm = react_1.useMemo(function () {
        return formik_1.withFormik({
            mapPropsToValues: function (_props) { return initialValues; },
            validationSchema: function (props) {
                if (props.validationSchema)
                    return Yup.object().shape(props.validationSchema(Yup));
                return Yup.object().shape({});
            },
            handleSubmit: function (values, _a) {
                var props = _a.props;
                var outValues = values;
                for (var _i = 0, _b = Object.entries(initialValues); _i < _b.length; _i++) {
                    var _c = _b[_i], key = _c[0], value = _c[1];
                    if (typeof value === "number" && typeof outValues[key] === "string") {
                        if (outValues[key] === "")
                            outValues[key] = null;
                        else
                            outValues[key] = +outValues[key];
                    }
                }
                return props.onSubmit(outValues);
            },
        })(function (formikProps) {
            var isValid = formikProps.isValid;
            var props = __assign(__assign({}, formikProps), { disabled: !isValid });
            return react_1.default.createElement(InnerForm, __assign({}, props));
        });
    }, dependencies);
    return WrappedForm;
}
exports.useFormikForm = useFormikForm;
//# sourceMappingURL=FormikWrapper.js.map