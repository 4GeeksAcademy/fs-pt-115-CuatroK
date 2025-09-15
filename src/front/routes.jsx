// src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Home } from "./pages/public/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import { Products } from "./components/NavbarComponentes/Products";
import { ContactUs } from "./components/NavbarComponentes/ContactUs";
import { AboutUs } from "./components/NavbarComponentes/AboutUs";
import { CreateAccount } from "./components/NavbarComponentes/User/CreateAccount";
import { Login } from "./components/NavbarComponentes/User/Login";


import { RootLayout } from "./layout/Root.layout";
import { PublicLayout } from "./layout/Public.layout";
import CalculadoraMetales from "./components/public/Calculadora";
import { ProfileLayout } from "./layout/Profile.layout";
import { Profile } from "./pages/admin/Profile";
import { Gallery } from "./components/NavbarComponentes/Gallery";
import { Payment } from "./pages/admin/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<h1>Not found!</h1>}>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="demo" element={<Demo />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
      <Route path="single/:theId" element={<Single />} />

      <Route element={<ProfileLayout />}>
        <Route path="user" element={<Profile />} />
        <Route
          path="payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
      </Route>


      <Route path="products" element={<Products />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="about" element={<AboutUs />} />



      <Route path="user/createAccount" element={<CreateAccount />} />
      <Route path="login" element={<Login />} />

      <Route path="calculadora" element={<CalculadoraMetales />} />



      <Route path="*" element={<h1>404</h1>} />
    </Route>
  )
);