import React from "react";
// import loadable from "react-loadable";
import { Route, Routes } from "react-router-dom";
// import { KeepAlive } from "react-activation";
//import Home from "./../pages/Home";
// import Mobx from "./../pages/Mobx";

const routerConfigList = [
    {
        path: "/",
        element: React.lazy(() => import("./../pages/Home/index.tsx"))
    }
];

const Loading = () => {
    return <div>Loading</div>;
};

export default () => {
    return (
        <Routes>
            {routerConfigList.map((routeItem, index) => {
                const AsyncLoadComponent = routeItem.element;
                return (
                    <Route
                        key={index}
                        path={routeItem.path}
                        element={
                            <React.Suspense fallback={<Loading />}>
                                <AsyncLoadComponent />
                            </React.Suspense>
                        }
                    />
                );
            })}
        </Routes>
    );
};
