import React from "react";

const OptionsWrapper = ({ children }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            { children }
        </div>
    );
};

export default OptionsWrapper;
