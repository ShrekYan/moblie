import React, { useEffect } from "react";
import numeral from "numeral";

const NumeralPage: React.FC = () => {
    useEffect(() => {
        const value = numeral(100.01);
        console.log(value.add(100.02).value());
        console.log(value.subtract(0.03).value());
        console.log(value.multiply(2).value());
        console.log(value.divide(2).value());
        const value1 = numeral(1000);
        console.log(value1.format("0.00"));
    }, []);

    return <div>NumeralPage</div>;
};

export default NumeralPage;
