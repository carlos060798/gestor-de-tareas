import { Outlet } from "react-router-dom";
import Tabs from "./components/tabk";

function LayautProfile() {
    return ( <>
      <Tabs />
      <Outlet />
    </> );
}

export default LayautProfile;