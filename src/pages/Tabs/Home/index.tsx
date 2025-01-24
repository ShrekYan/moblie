import React from "react";
import { useActivate, useUnactivate } from "react-activation";
import { useNavigate } from "react-router-dom";
import { Button } from "antd-mobile";

const Home: React.FC = () => {
    const navigate = useNavigate();
    useActivate(() => {
        console.log("TestFunction: didActivate");
    });

    useUnactivate(() => {
        console.log("TestFunction: willUnactivate");
    });
    return (
        <div>
            <Button
                type={"button"}
                onClick={() => {
                    navigate("/product/rateStructure/622080");
                }}
            >
                跳转到费率结构页面
            </Button>
        </div>
    );
};

export default Home;
