import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar/Navbar.jsx";
import TopBar from "./topstrip/Topbar";
import Footer from "./footer/Footer";

const PublicLayout = () => {
    return (
        <div className="overflow-x-hidden">
            <TopBar />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
