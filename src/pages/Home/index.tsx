import React from "react";
import reactLogo from "/images/react.svg";
import viteLogo from "/images/vite.svg";
import classnames from "classnames";
import styles from "./index.module.scss";

const Home: React.FC = () => {
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
                {/*<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>*/}
                <p className={styles.pTest}>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className={styles.readTheDocs}>Click on the Vite and React logos to learn more</p>
        </>
    );
};

export default Home;
