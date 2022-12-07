import React from "react";

function Button({ children, type }) {
    let className = `px-4 py-2 bg-myIndigo text-white rounded`;

    if (type == "secondary")
        className = `px-4 py-2 bg-myRed text-white rounded`;

    return <button className={className}>{children}</button>;
}

export default Button;
