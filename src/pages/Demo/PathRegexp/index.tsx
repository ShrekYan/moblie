import React, { useEffect } from "react";
import { match, pathToRegexp, compile } from "path-to-regexp";

const PathRegexp: React.FC = () => {
    useEffect(() => {
        const regexp = match("/users/:id/delete");
        console.log(regexp("/users/123/delete"));
        console.log(pathToRegexp("/foo/:bar"));
        const toPath = compile("/user/:id");
        console.log(toPath({ id: "shrek" }));
    }, []);

    return <div>PathRegexp</div>;
};

export default PathRegexp;
