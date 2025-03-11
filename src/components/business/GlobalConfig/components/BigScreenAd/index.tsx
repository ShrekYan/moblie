import React, { useEffect } from "react";
import useEventEmitter from "@/utils/event/useEventEmitter.ts";
import { Modal } from "antd-mobile";

const BigScreenAd: React.FC = () => {
    const emitter = useEventEmitter();

    useEffect(() => {
        emitter.listen("bigScreenAdList", ([data]) => {
            if (data) {
                Modal.alert({
                    content: data.fileName,
                    onConfirm: () => {
                        console.log("Confirmed");
                    }
                });
            }
        });
    }, []);

    return null;
};

export default BigScreenAd;
