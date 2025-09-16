import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../services/serviceApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem("token") || null);

    const registerUser = async (userData, navigate) => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/register",
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
                "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/login",
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
            navigate("/")
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    const logoutUser = () => {
        sessionStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

    const getUserApi = async () => {
        const data = await getUser()
        setUser(data)
    }
    useEffect(() => {
        if (token) {
            getUserApi()
        }
    }, [token])

    return (
        <AuthContext.Provider value={{ user, error, setError, loading, token, registerUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext)
}