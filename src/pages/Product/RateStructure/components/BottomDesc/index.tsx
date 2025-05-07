import React from "react";
import { useObserver } from "mobx-react";
import useStore from "./../../useStore.ts";

const BottomDesc: React.FC = () => {
    const store = useStore();
    return useObserver(() => {
        return <div>页面子组件使用store测试：{store?.productRate?.manageRatio}</div>;
    });
};
export default BottomDesc;
