import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../AdminLogin";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in (has jwt cookie)
        const checkAuth = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/me`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    navigate("/admin");
                }
            } catch (err) {
                // User not authenticated, show login
            }
        };
        checkAuth();
    }, [navigate]);


    return <AdminLogin />;
};

export default Login;
