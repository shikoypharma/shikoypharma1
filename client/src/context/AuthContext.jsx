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
            // Instant state from local storage
            const localUserStr = localStorage.getItem("userInfo");
            if (localUserStr) {
                try {
                    setUser(JSON.parse(localUserStr));
                } catch (e) { }
            }

            const { data } = await axios.get("/api/auth/me");
            setUser(data);

            // Re-sync local storage but preserve the token if it exists
            const currentStr = localStorage.getItem("userInfo");
            let token = null;
            if (currentStr) {
                try {
                    const parsed = JSON.parse(currentStr);
                    token = parsed.token;
                } catch (e) { }
            }
            if (token) {
                localStorage.setItem("userInfo", JSON.stringify({ ...data, token }));
            } else {
                localStorage.setItem("userInfo", JSON.stringify(data));
            }
        } catch (error) {
            setUser(null);
            localStorage.removeItem("userInfo");
        } finally {
            setLoading(false);
        }
    };

    // Login user (username + password — kept for backward compatibility)
    const login = async (credentials) => {
        const res = await axios.post("/api/auth/login", credentials);
        setUser(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
    };

    // Logout user
    const logout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
        localStorage.removeItem("userInfo");
        window.location.href = '/admin/login'; // Force redirect and clear state fully
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
