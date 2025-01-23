import React from "react";
import "./PageLoading.scss";

const PageLoading: React.FC = () => {
    return (
        <div className="page-loading-wrap">
            <div className="page-loading-pic"></div>
            <div className="page-loading-content">
                <div className="loading-dots">
                    <div className="dot-item first-dot"></div>
                    <div className="dot-item tow-dot"></div>
                    <div className="dot-item three-dot"></div>
                </div>
            </div>
        </div>
    );
};

export default PageLoading;
