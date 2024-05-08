
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navabar"
import Footer from "../components/Footer"
export default   function  LayautApp ()  {
    return (
        <div>
            <Navbar />
          <div className="container mx-auto p-4">
            <Outlet />
            <Footer />
           </div>
        </div>
    )
}