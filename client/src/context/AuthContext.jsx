import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // Check if user is logged in
    const checkUserLoggedIn = async () => {
        try {
            const { data } = await axios.get("/api/auth/me");
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login user (username + password — kept for backward compatibility)
    const login = async (credentials) => {
        const res = await axios.post("/api/auth/login", credentials);
        setUser(res.data);
    };

    // Login admin via Google credential token
    const googleLogin = async (credential) => {
        const res = await axios.post("/api/auth/google", { credential });
        setUser(res.data);
    };

    // Logout user
    const logout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
        window.location.href = '/admin/login'; // Force redirect and clear state fully
    };

    return (
        <AuthContext.Provider value={{ user, login, googleLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
