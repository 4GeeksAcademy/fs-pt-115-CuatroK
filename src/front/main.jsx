import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import { BackendURL } from './components/BackendURL';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { AuthProvider } from './hooks/useAuth';
// Catalogo 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProviderGoogle } from './auth/AuthProvider';
import { CartProvider } from './hooks/useFetch';



const Main = () => {

    if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
            <BackendURL />
        </React.StrictMode>
    );
    return (
        <React.StrictMode>
            {/* Provide global state to all components */}
            {/* Set up routing for the application */}
            <AuthProviderGoogle>
                <StoreProvider>
                    <AuthProvider>
                        <CartProvider>

                            <RouterProvider router={router}>
                            </RouterProvider>
                        </CartProvider>
                    </AuthProvider>
                </StoreProvider>
            </AuthProviderGoogle>

        </React.StrictMode >
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
