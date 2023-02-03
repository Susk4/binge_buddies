import React from "react";

const UserFilterRowWrapper = ({ title, children }) => {
    return (
        <div>
            <h2 className="text-xl">{title}</h2>
            <div className="mx-5">{children}</div>
        </div>
    );
};

export default UserFilterRowWrapper;
