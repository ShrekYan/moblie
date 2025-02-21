import React, { useEffect } from "react";
import { useActivate, useUnactivate } from "react-activation";
import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { Button } from "antd-mobile";
import style from "./index.module.scss";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log(location);
        console.log(params);
        console.log(searchParams);
    }, []);

    useActivate(() => {
        console.log("TestFunction: didActivate");
    });

    useUnactivate(() => {
        console.log("TestFunction: willUnactivate");
    });

    return (
        <div className={style.homeContainer}>
            <Button
                color="primary"
                type={"button"}
                onClick={() => {
                    navigate("/product/rateStructure/622080");
                }}
            >
                跳转到费率结构页面
            </Button>
            <div className={style.test}></div>
        </div>
    );
};

export default Home;
