import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/public/Footer";

export function PublicLayout(){
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
       </>
    )
    
}