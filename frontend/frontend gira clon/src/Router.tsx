import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";

import LayautApp from "./layauts/LayautApp";
import DashbooarMain from "./pages/DashbooarMain";
import ProjectDetailViuw from "./Project/ProjectDetailViuw";
import LayautAuth from "./layauts/Layautauth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ConfirmAccountView from "./components/auth/components/confir-Acount";
import PageNotFound from "./pages/404Page";
import {RequestEmail}  from "./components/auth/components/requestEmail";
import ForgotPasswordView from "./components/auth/components/forgot-password";
import ConfirTokenpass from "./components/auth/components/confirm-tokenPassword";
import NewPasswordForm from "./components/auth/components/new-password";


export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
           
            <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route element={<LayautAuth />} >
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/register" element={<Register/>} />
            <Route path="/auth/Cofirm" element={<ConfirmAccountView/>} />
            <Route path="/auth/request" element={<RequestEmail/>} />
            <Route path="/auth/Newpasswordemail" element={<ForgotPasswordView/>} />
            <Route path="/auth/forgot-password" element={<ConfirTokenpass/>} />
            <Route path="/auth/new-password/:token" element={<NewPasswordForm/>} />
        </Route>
        <Route element={<LayautApp />} >
            <Route path="/dasbord" element={<DashbooarMain />} index />
            <Route path="/detailt/:projectid" element={<ProjectDetailViuw />} />
            

            </Route>
        <Route path="*" element={<PageNotFound/>} />
        </Routes>
           

    </BrowserRouter>
  );
}