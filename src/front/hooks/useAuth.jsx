import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../services/serviceApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const url = import.meta.env.VITE_BACKEND_URL + "/api";
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem("token") || null);
    const [finalAmount, setFinalAmount] = useState(null)
    const [discount, setDiscount] = useState("")
    const { loginWithRedirect, user: userAuth0, isAuthenticated, logout: logoutGoogle } = useAuth0();

    const loginUsingGoogle = () => {
        loginWithRedirect()
    }

    const loginSync = async () => {
        if (!userAuth0) return

        setLoading(true)
        try {
            const response = await fetch(`${url}/user/client/register-google`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: userAuth0.email,
                        username: userAuth0.nickname,
                        full_name: userAuth0.name,
                    })
                }
            )
            const data = await response.json()
            setToken(data.token)
            sessionStorage.setItem("token", data.token)
            setUser(data.user)
            return data
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const registerUser = async (userData, navigate) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${url}/user/client/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg);
            }
            navigate("/login")
            setUser(data.new_user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (userData, navigate) => {
        setLoading(true)
        try {
            const response = await fetch(
                `${url}/user/client/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg);
            }

            setToken(data.token)
            sessionStorage.setItem("token", data.token)


        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    const logoutUser = () => {
        sessionStorage.removeItem("token")
        logoutGoogle()
        setToken(null)
        setUser(null)
    }

    const getUserApi = async (navigate) => {
        const data = await getUser()
        setUser(data)
        if (user && !user.is_admin && navigate) {
            navigate("/")
        }
        if (user && user.is_admin && navigate) {
            navigate("/admin-home")
        }
    }
    useEffect(() => {
        if (user) {
            if (user.msg == 'Token has expired' || user.msg == "Not enough segments") {
                sessionStorage.removeItem("token");
                setToken(null)
                setUser(null)
            }
        }
    }, [user])
    useEffect(() => {
        if (userAuth0 && isAuthenticated) {
            loginSync()
        }
    }, [userAuth0, isAuthenticated])
    return (
        <AuthContext.Provider value={{ user, error, setError, loading, token, registerUser, loginUser, logoutUser, finalAmount, setFinalAmount, discount, setDiscount, loginUsingGoogle, getUserApi }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext)
}