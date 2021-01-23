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
import React, { useMemo } from "react";
import { Form, withFormik, } from "formik";
import * as Yup from "yup";
function setFormLocale(locale) {
    Yup.setLocale(locale);
}
function useFormikForm(InnerForm, initialValues, dependencies) {
    var WrappedForm = useMemo(function () {
        return withFormik({
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
            return React.createElement(InnerForm, __assign({}, props));
        });
    }, dependencies);
    return WrappedForm;
}
export { Form, useFormikForm, setFormLocale };
//# sourceMappingURL=FormikWrapper.js.map