import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { Home } from "./pages/public/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import { Products } from "./components/NavbarComponentes/Products";
import { ContactUs } from "./components/NavbarComponentes/ContactUs";
import { AboutUs } from "./components/NavbarComponentes/AboutUs";
import { CreateAccount } from "./pages/auth/CreateAccount";
import { Login } from "./pages/auth/Login";

import { RootLayout } from "./layout/Root.layout";
import { PublicLayout } from "./layout/Public.layout";
import CalculadoraMetales from "./components/public/Calculadora";
import { ProfileLayout } from "./layout/Profile.layout";
import { Profile } from "./pages/admin/Profile";
import { Gallery } from "./components/NavbarComponentes/Gallery";
import { Payment } from "./pages/admin/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { ProccessToResetPassword } from "./pages/admin/ProcessToResetPassword";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { AuthLayout } from "./layout/Auth.layout";
import { Catalogo } from "./pages/public/Catalogo/Catalogo";
import { ProductoPage } from "./pages/public/Producto/ProductoPage";
import { PedidoDetail } from "./components/admin/historialDePedidosComponents/PedidoDetail";
import { PaymentSuccessfull } from "./pages/public/PaymentSuccessfull";

import { SearchResults } from "./pages/public/SearchResult/SearchResult";
import { AdminLayout } from "./layout/Admin.layout";
import { AdminHome } from "./pages/admin/isAdmin/AdminHome";
import { PostProduct } from "./pages/admin/isAdmin/PostProduct";
import { ProductList } from "./pages/admin/isAdmin/ProductList";
import { SalesList } from "./pages/admin/isAdmin/SalesList";
import { UserList } from "./pages/admin/isAdmin/UserList";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<h1>Not found!</h1>}>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="demo" element={<Demo />} />
        <Route path="calculadora" element={<CalculadoraMetales />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="/" element={<Products />} />

        <Route path="resultados/:busqueda" element={<SearchResults />} />

        <Route path="/catalogo/:category" element={<Catalogo />} />
        <Route path="/producto/:idOrSlug" element={<ProductoPage />} />

        <Route path="/success" element={
          <Elements stripe={stripePromise}>
            <PaymentSuccessfull />
          </Elements>
        }> </Route>


        <Route path="*" element={<h1>404</h1>} />
      </Route>

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
        <Route path="reset-password" element={<ProccessToResetPassword />} />
        <Route path="reset-password-form" element={<ResetPassword />} />
        <Route path="/sale/:id" element={<PedidoDetail />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="admin-home" element={<AdminHome />}></Route>
        <Route path="post-product" element={<PostProduct />}></Route>
        <Route path="product-list" element={<ProductList />}></Route>
        <Route path="sales-list" element={<SalesList />}></Route>
        <Route path="user-list" element={<UserList />}></Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="register" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Route>
  )
);
