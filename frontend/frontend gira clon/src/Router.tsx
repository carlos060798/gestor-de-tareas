import { BrowserRouter,Routes,Route } from "react-router-dom";

import LayautApp from "./layauts/LayautApp";
import DashbooarMain from "./pages/DashbooarMain";


export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<LayautApp />} >
            <Route path="/" element={<DashbooarMain />} index />
            

            </Route>
        </Routes>
    </BrowserRouter>
  );
}