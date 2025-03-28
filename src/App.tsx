import { HashRouter } from "react-router-dom";
import { AliveScope } from "react-activation";
import RouteList from "./routes/index.tsx";
import { ErrorBoundary, Network } from "react-awesome-all-component";
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
