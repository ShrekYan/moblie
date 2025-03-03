import React from "react";
import { useActivate, useUnactivate } from "react-activation";

const Investment: React.FC = () => {
    useActivate(() => {
        console.log("Investment: didActivate");
    });

    useUnactivate(() => {
        console.log("Investment: willUnactivate");
    });
    return <div>Investment</div>;
};

export default Investment;
