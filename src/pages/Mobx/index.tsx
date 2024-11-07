import React from "react";
import { useObserver } from "mobx-react";
import useStore from "./useStore.ts";

/**
 * todo eslint 空格处理
 * @constructor
 */
const Mobx: React.FC = () => {


    const store = useStore();

    return useObserver(() => {
        return (
            <h1 onClick={store.toggle}>
                {store.title} {store.done ? "[DONE]" : "[TODO]"}
            </h1>
        );
    });
};

export default Mobx;