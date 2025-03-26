import Dashboard from "./page/Dashboard/index.tsx";

const subAppRoutes = [
    {
        path: "dashboard", // 实际路径为 /subapp/dashboard
        element: <Dashboard />,
        pageName: "Dashboard"
    },
    {
        path: "profile",
        element: <div>Profile</div>,
        pageName: "Profile"
    }
];

export default subAppRoutes;
