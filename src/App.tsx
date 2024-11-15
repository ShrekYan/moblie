import { HashRouter } from "react-router-dom";
import RouteList from "./routes/index.tsx";

function App() {
    return (
        <HashRouter>
            <RouteList />
        </HashRouter>
    );
}

export default App;
