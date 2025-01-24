import React from "react";
import { useActivate, useUnactivate } from "react-activation";

const Investment: React.FC = () => {
    useActivate(() => {
        console.log("TestFunction: didActivate");
    });

    useUnactivate(() => {
        console.log("TestFunction: willUnactivate");
    });
    return <div>Investment</div>;
};

export default Investment;
