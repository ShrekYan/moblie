import React, { useEffect } from "react";
import useLocalStorage from "@/helpers/useLocalStorage.ts";
import useSessionStorage from "@/helpers/useSessionStorage.ts";

const LocalforagePage: React.FC = () => {
    const localStorage = useLocalStorage();
    const sessionStorage = useSessionStorage();
    //可以封装成hooks
    useEffect(() => {
        localStorage.setItem("userInfo1", { session: "1234", userId: "321" });
        localStorage.getItem("userInfo1");
        localStorage.length((err, numberOfKeys) => {
            console.log(numberOfKeys);
            console.log(err);
        });
        localStorage.key(2, (err, key) => {
            console.log(key);
            console.log(err);
        });
        sessionStorage.setItem("userInfo1", { session: "1234", userId: "321" });
        sessionStorage.getItem("userInfo1");
        sessionStorage.length((err, numberOfKeys) => {
            console.log(numberOfKeys);
            console.log(err);
        });
        sessionStorage.key(2, (err, key) => {
            console.log(key);
            console.log(err);
        });
    }, []);
    return <div>LocalforagePage</div>;
};

export default LocalforagePage;
