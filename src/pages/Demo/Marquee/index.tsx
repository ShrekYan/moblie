import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeContainer: React.FC = () => {
    return (
        <div>
            <Marquee speed={40}>
                <span style={{ fontSize: 20, marginRight: 30 }}>
                    🎉 欢迎访问我们的网站！最新优惠：全场商品五折起！ 🚀
                </span>
            </Marquee>
        </div>
    );
};

export default MarqueeContainer;
