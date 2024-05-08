import { BrowserRouter,Routes,Route } from "react-router-dom";

import LayautApp from "./layauts/LayautApp";
import DashbooarMain from "./pages/DashbooarMain";
import CreateProject from "./Project/CreateProject";
export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<LayautApp />} >
            <Route path="/" element={<DashbooarMain />} index />
            <Route path="/proyecto/nuevo" element={< CreateProject/>} />

            </Route>
        </Routes>
    </BrowserRouter>
  );
}