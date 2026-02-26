import { useContext, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import {
    LayoutDashboard,
    Package,
    Calendar,
    Globe,
    MessageSquare,
    LogOut,
    Briefcase,
    Building2,
    Image,
    FileText
} from "lucide-react";

const AdminLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/admin/login");
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!user) return null;

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
        { label: "Products", href: "/admin/products", icon: <Package size={20} /> },
        { label: "Categories", href: "/admin/categories", icon: <FileText size={20} /> },
        { label: "Doctor Resources", href: "/admin/doctor-resources", icon: <FileText size={20} /> },
        { label: "Events", href: "/admin/events", icon: <Calendar size={20} /> },
        { label: "Global Data", href: "/admin/global", icon: <Globe size={20} /> },
        { label: "Inquiries", href: "/admin/inquiries", icon: <MessageSquare size={20} /> },
        { label: "Career", href: "/admin/career", icon: <Briefcase size={20} /> },
        { label: "Expertise", href: "/admin/expertise", icon: <Building2 size={20} /> },
        { label: "Gallery", href: "/admin/gallery", icon: <Image size={20} /> },
        { label: "About Us", href: "/admin/about", icon: <Building2 size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Admin Portal</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-700">Welcome, {user.username}</h2>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
