import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function PublicLayout(){
    return (
        <>
        <Navbar/>
        <Outlet/>
       </>
    )
    
}