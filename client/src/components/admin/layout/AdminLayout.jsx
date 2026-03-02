import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import {
    LayoutDashboard,
    Package,
    Globe,
    MessageSquare,
    LogOut,
    Briefcase,
    Building2,
    Image,
    FileText,
    Home,
    PanelBottom,
    MapPin,
    Menu,
    X
} from "lucide-react";

const AdminLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/admin/login");
        }
    }, [user, loading, navigate]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!user) return null;

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { label: "Home Page", href: "/admin/home", icon: <Home size={20} /> },
        { label: "Footer", href: "/admin/global", icon: <PanelBottom size={20} /> },
        { label: "Products", href: "/admin/products", icon: <Package size={20} /> },
        { label: "Categories", href: "/admin/categories", icon: <FileText size={20} /> },
        { label: "Doctor Resources", href: "/admin/doctor-resources", icon: <FileText size={20} /> },
        { label: "Inquiries", href: "/admin/inquiries", icon: <MessageSquare size={20} /> },
        { label: "Career", href: "/admin/career", icon: <Briefcase size={20} /> },
        { label: "Expertise", href: "/admin/expertise", icon: <Building2 size={20} /> },
        { label: "Gallery", href: "/admin/gallery", icon: <Image size={20} /> },
        { label: "About Us", href: "/admin/about", icon: <Building2 size={20} /> },
        { label: "Contact Us", href: "/admin/contact", icon: <MapPin size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100 overflow-x-hidden">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="p-6 border-b flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Admin Portal</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 hover:bg-gray-100 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm
                                ${location.pathname === item.href
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto min-w-0 flex flex-col h-screen">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-30 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-700">Welcome, {user.username}</h2>
                    </div>
                </header>
                <div className="p-4 sm:p-6 lg:p-8 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
