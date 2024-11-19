import { HashRouter } from "react-router-dom";
import { AliveScope } from "react-activation";
import RouteList from "./routes/index.tsx";

function App() {
    return (
        <HashRouter>
            <AliveScope>
                <RouteList />
            </AliveScope>
        </HashRouter>
    );
    // return <RouterProvider router={RouteList} />;
}

export default App;
