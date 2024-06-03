
import { Outlet,Navigate } from "react-router-dom"
import Navbar from "../components/Navabar"
import Footer from "../components/Footer"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import useAuth from "../hook/useAuth"


export default   function  LayautApp ()  {
    const{data,isError,isLoading} = useAuth()
    if (isLoading) return  "Loading..."
    if (isError) return <Navigate to="/auth/login" />
    return (
        <div>
            <Navbar data={data} />
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