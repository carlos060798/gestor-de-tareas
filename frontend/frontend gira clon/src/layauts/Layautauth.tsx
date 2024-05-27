import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function LayautAuth() {
    return (  <>
    <Outlet />
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
    </>);
}

export default LayautAuth;