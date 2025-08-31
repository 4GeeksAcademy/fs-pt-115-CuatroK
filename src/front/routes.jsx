// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
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

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route element={<RootLayout />} errorElement={<h1>Not found!</h1>} >

      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />

      </Route>
      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<ContactUs />} />

      <Route path="/user" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />

    </Route>
  )
);