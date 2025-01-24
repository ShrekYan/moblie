import React from "react";
import { useActivate, useUnactivate } from "react-activation";

const Home: React.FC = () => {
    useActivate(() => {
        console.log("TestFunction: didActivate");
    });

    useUnactivate(() => {
        console.log("TestFunction: willUnactivate");
    });
    return <div>Home</div>;
};

export default Home;
