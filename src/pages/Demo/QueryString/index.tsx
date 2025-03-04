import React, { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const QueryString: React.FC = () => {
    const domLocation = useLocation();
    useEffect(() => {
        console.log(queryString.parse(location.hash));
        const useInfo = {
            userId: "123",
            session: "321"
        };
        console.log(queryString.stringify(useInfo));
        console.log(domLocation.search);
        console.log(queryString.parse(domLocation.search));
        console.log(domLocation);
    }, []);
    return <div>QueryString</div>;
};

export default QueryString;
