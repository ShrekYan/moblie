import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
//import { useAliveController } from "react-activation";
import icNoHome from "@/assets/images/Tabs/ic-no-home.png";
import icHome from "@/assets/images/Tabs/ic-home.gif";
import icSelect from "@/assets/images/Tabs/ic-select.gif";
import icNoSelect from "@/assets/images/Tabs/ic-no-select.png";
import icInvestment from "@/assets/images/Tabs/ic-investment.gif";
import icNoInvestment from "@/assets/images/Tabs/ic-no-investment.png";
import icProduct from "@/assets/images/Tabs/ic-product.gif";
import icNoProduct from "@/assets/images/Tabs/ic-no-product.png";
import icMy from "@/assets/images/Tabs/ic-my.gif";
import icNoMy from "@/assets/images/Tabs/ic-no-my.png";
import style from "./index.module.scss";

const TabWrapper: React.FC = () => {
    // const { getCachingNodes } = useAliveController();
    const location = useLocation();
    const navigate = useNavigate();
    /**
     * tab切换
     * @param path 路由片段
     */
    const handleSwitchTabClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className={style.tabWrapper}>
            <Outlet />
            <div className={style.tabBar}>
                <div
                    className={style.tabBarItem}
                    onClick={() => {
                        handleSwitchTabClick("/tab/home");
                    }}
                >
                    <div className={style.tabPageIcon}>
                        <img
                            width="100%"
                            height="100%"
                            src={location.pathname === "/tab/home" ? icHome : icNoHome}
                            alt={"Home"}
                        />
                    </div>
                    <div className={style.tabText}>首页</div>
                </div>
                <div
                    className={style.tabBarItem}
                    onClick={() => {
                        handleSwitchTabClick("/tab/choose");
                    }}
                >
                    <div className={style.tabPageIcon}>
                        <img
                            width="100%"
                            height="100%"
                            src={location.pathname === "/tab/choose" ? icSelect : icNoSelect}
                            alt={"choose"}
                        />
                    </div>
                    <div className={style.tabText}>自选</div>
                </div>
                <div
                    className={style.tabBarItem}
                    onClick={() => {
                        handleSwitchTabClick("/tab/fof");
                    }}
                >
                    <div className={style.tabPageIcon}>
                        <div className={style.tabPageIcon}>
                            <img
                                width="100%"
                                height="100%"
                                src={
                                    location.pathname === "/tab/fof" ? icInvestment : icNoInvestment
                                }
                                alt={"fof"}
                            />
                        </div>
                    </div>
                    <div className={style.tabText}>投顾</div>
                </div>
                <div
                    className={style.tabBarItem}
                    onClick={() => {
                        handleSwitchTabClick("/tab/investment");
                    }}
                >
                    <div className={style.tabPageIcon}>
                        <img
                            width="100%"
                            height="100%"
                            src={location.pathname === "/tab/investment" ? icProduct : icNoProduct}
                            alt={"investment"}
                        />
                    </div>
                    <div className={style.tabText}>基金</div>
                </div>
                <div
                    className={style.tabBarItem}
                    onClick={() => {
                        handleSwitchTabClick("/tab/my");
                    }}
                >
                    <div className={style.tabPageIcon}>
                        <img
                            width="100%"
                            height="100%"
                            src={location.pathname === "/tab/my" ? icMy : icNoMy}
                            alt={"my"}
                        />
                    </div>
                    <div className={style.tabText}>我的</div>
                </div>
            </div>
        </div>
    );
};

export default TabWrapper;
