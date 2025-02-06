import "./Loading.scss";

/**
 * loading Component
 * @param props
 * @returns {*}
 * @constructor
 */
const Loading = (props: any) => {
    if (!props.showLoading) {
        return null;
    }
    return (
        <div className="common-loading">
            <div className="loading-container">
                <div className="mask"></div>
                <div className="content">
                    <div className="container">
                        <div className="loader">
                            <svg className="circular1" viewBox="25 25 50 50">
                                {/*  <circle id="circle" cx="50" cy="50" r="50"  fill="none" stroke-width="5" stroke="green" />*/}
                                <circle
                                    className="path"
                                    cx="50"
                                    cy="50"
                                    r="20"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                />
                            </svg>
                            <svg className="circular2" viewBox="25 25 50 50">
                                {/*  <circle id="circle" cx="50" cy="50" r="50"  fill="none" stroke-width="5" stroke="green" />*/}
                                <circle
                                    className="path"
                                    cx="50"
                                    cy="50"
                                    r="20"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                />
                            </svg>
                        </div>
                        <div className="loader-text">正在加载...</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
