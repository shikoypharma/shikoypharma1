import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, Plus, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get("/api/events");
            setEvents(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching events", error);
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await axios.delete(`/api/events/${id}`);
                setEvents(events.filter((event) => event._id !== id));
            } catch (error) {
                console.error("Error deleting event", error);
                alert("Failed to delete event");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Event Manager</h1>
                <Link to="/admin/events/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} />
                    Add Event
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {(event.images && event.images.length > 0) && (
                            <img src={event.images[0]} alt={event.title} className="w-full h-48 object-cover" />
                        )}
                        {!event.images?.length && (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <div className="text-sm text-gray-600 space-y-1 mb-3">
                                <p className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {event.date ? new Date(event.date).toLocaleDateString() : 'No Date'}
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {event.location || 'No Location'}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link to={`/admin/events/edit/${event._id}`} className="text-indigo-600 hover:text-indigo-900 p-2">
                                    <Edit size={20} />
                                </Link>
                                <button
                                    onClick={() => deleteEvent(event._id)}
                                    className="text-red-600 hover:text-red-900 p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManager;
