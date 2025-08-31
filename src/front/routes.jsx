// src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import { Products } from "./components/NavbarComponentes/Products";
import { ContactUs } from "./components/NavbarComponentes/ContactUs";
import { AboutUs } from "./components/NavbarComponentes/AboutUs";
import { CreateAccount } from "./components/NavbarComponentes/User/CreateAccount";
import { Login } from "./components/NavbarComponentes/User/Login";

import { RootLayout } from "./layout/RootLayout";
import { PublicLayout } from "./layout/PublicLayout";

import CalculadoraMetales from "./components/public/CalculadoraMetales";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<h1>Not found!</h1>}>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="demo" element={<Demo />} />
        <Route path="single/:theId" element={<Single />} />


        <Route path="products" element={<Products />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />


        <Route path="user/createAccount" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />

        <Route path="calculadora" element={<CalculadoraMetales />} />

       
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Route>
  )
);