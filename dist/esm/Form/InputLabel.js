import React from "react";
export var InputLabel = function (props) {
    return (React.createElement("label", { htmlFor: props.for },
        props.label,
        " ",
        props.required && React.createElement("span", { className: "required" }, " *")));
};
//# sourceMappingURL=InputLabel.js.map