
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navabar"
import Footer from "../components/Footer"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default   function  LayautApp ()  {
    return (
        <div>
            <Navbar />
          <div className="container mx-auto p-4">
            <Outlet />
         
            <Footer />
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover

            />
          
           </div>
        </div>
    )
}