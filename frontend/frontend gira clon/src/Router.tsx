import { BrowserRouter,Routes,Route } from "react-router-dom";

import LayautApp from "./layauts/LayautApp";
import DashbooarMain from "./pages/DashbooarMain";
import ProjectDetailViuw from "./Project/ProjectDetailViuw";


export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<LayautApp />} >
            <Route path="/" element={<DashbooarMain />} index />
            <Route path="/detailt/:projectid" element={<ProjectDetailViuw />} />
            

            </Route>
        </Routes>
    </BrowserRouter>
  );
}