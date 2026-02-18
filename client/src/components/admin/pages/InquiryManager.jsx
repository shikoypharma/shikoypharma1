import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Mail, CheckCircle, Clock } from "lucide-react";

const InquiryManager = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const { data } = await axios.get("/api/inquiry");
            setInquiries(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching inquiries", error);
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/inquiry/${id}/status`, { status });
            setInquiries(inquiries.map(inq =>
                inq._id === id ? { ...inq, status } : inq
            ));
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update status");
        }
    };

    const deleteInquiry = async (id) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            try {
                await axios.delete(`/api/inquiry/${id}`);
                setInquiries(inquiries.filter((inq) => inq._id !== id));
            } catch (error) {
                console.error("Error deleting inquiry", error);
                alert("Failed to delete inquiry");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Inquiries</h1>

            <div className="grid gap-4">
                {inquiries.length === 0 && <p className="text-gray-500">No inquiries found.</p>}

                {inquiries.map((inq) => (
                    <div key={inq._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    {inq.name}
                                    <span className={`text-xs px-2 py-1 rounded-full ${inq.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                                            inq.status === 'read' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {inq.status.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">{inq.type}</span>
                                </h3>
                                <p className="text-gray-600 flex items-center gap-1 text-sm mt-1">
                                    <Mail size={14} /> {inq.email} | {inq.phone}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                    {new Date(inq.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {inq.status !== 'responded' && (
                                    <button
                                        onClick={() => updateStatus(inq._id, "responded")}
                                        title="Mark as Responded"
                                        className="text-green-600 hover:text-green-800 p-2"
                                    >
                                        <CheckCircle size={20} />
                                    </button>
                                )}
                                {inq.status === 'new' && (
                                    <button
                                        onClick={() => updateStatus(inq._id, "read")}
                                        title="Mark as Read"
                                        className="text-blue-600 hover:text-blue-800 p-2"
                                    >
                                        <Clock size={20} />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteInquiry(inq._id)}
                                    title="Delete"
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <p className="font-medium text-gray-800 mb-1">Subject: {inq.subject || "No Subject"}</p>
                            <p className="text-gray-700 whitespace-pre-wrap">{inq.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InquiryManager;
