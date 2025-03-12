import { HashRouter } from "react-router-dom";
import { AliveScope } from "react-activation";
import RouteList from "./routes/index.tsx";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Network from "@components/common/Network";
import "./styles.css";

function App() {
    return (
        <ErrorBoundary>
            <HashRouter>
                <AliveScope>
                    <RouteList />
                </AliveScope>
            </HashRouter>
            <Network />
        </ErrorBoundary>
    );
    // return <RouterProvider router={RouteList} />;
}

export default App;
