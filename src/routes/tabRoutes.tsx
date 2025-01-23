import React from "react";

const TabWrapper: React.FC = (props) => {
    console.log(props);
    return <div>TabWrapper</div>;
};

const Home: React.FC = () => {
    return <div>Home</div>;
};

const tabRoutes = () => {
    return [
        {
            path: "/tab",
            component: TabWrapper,
            children: [
                {
                    path: "/tab/home",
                    component: Home
                },
                {
                    path: "/tab/home",
                    component: Home
                },
                {
                    path: "/tab/home",
                    component: Home
                },
                {
                    path: "/tab/home",
                    component: Home
                }
            ]
        }
    ];
};

export default tabRoutes();
