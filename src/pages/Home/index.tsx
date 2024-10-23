import React, { useState, useEffect } from "react";
import reactLogo from "./../../assets/react.svg";
import viteLogo from "./../../../public/vite.svg";
import classnames from "classnames";
import styles from "./index.module.scss";
import http from "./../../service/http/index.ts";
import { Button } from "antd-mobile/2x";

const Home: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        http.post(
            "https://mobile.qiangungun.com/v1/caribbean/queryMarketIndexs",
            {
                marketIndexScenario: "Home"
            },
            {
                customUrl: true
            }
        ).then((data) => {
            console.log(data.data);
        });
        http.get("https://mobile.qiangungun.com/v1/wxconfig", {
            params: {
                url: encodeURIComponent(window.location.href.split("#")[0])
            }
        }).then((data) => {
            console.log(data);
        });
    }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className={styles.logo} alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className={classnames(styles.logo, styles.react)}
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className={styles.card}>
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p className={styles.pTest}>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className={styles.readTheDocs}>Click on the Vite and React logos to learn more</p>
            <Button>Text</Button>
        </>
    );
};

export default Home;
