import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Plus, X, Upload } from "lucide-react";

export default function HomeManager() {
    const [activeTab, setActiveTab] = useState("topbar");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // --- Topbar State (from /api/global) ---
    const [topbar, setTopbar] = useState({
        socials: [{ name: "facebook", url: "" }],
        links: [{ label: "", path: "", highlight: false }],
    });

    // --- Hero State (from /api/content/hero) ---
    const [hero, setHero] = useState({
        slides: [{ image: "", heading: "", subheading: "" }],
    });

    // --- About State (from /api/content/about) ---
    const [about, setAbout] = useState({
        title: "",
        description: "",
        image: "",
        highlights: [""],
    });

    useEffect(() => {
        fetchTopbar();
        fetchHero();
        fetchAbout();
    }, []);

    const fetchTopbar = async () => {
        try {
            const { data } = await axios.get("/api/global");
            if (data?.topbar) {
                setTopbar({
                    socials: data.topbar.socials?.length ? data.topbar.socials : [{ name: "", url: "" }],
                    links: data.topbar.links?.length ? data.topbar.links : [{ label: "", path: "", highlight: false }],
                });
            }
        } catch (err) {
            console.error("Error fetching topbar", err);
        }
    };

    const fetchHero = async () => {
        try {
            const { data } = await axios.get("/api/content/hero");
            if (data?.data?.slides) {
                setHero({ slides: data.data.slides });
            }
        } catch (err) {
            console.log("No hero data yet, using defaults");
        }
    };

    const fetchAbout = async () => {
        try {
            const { data } = await axios.get("/api/content/about");
            if (data?.data) {
                setAbout({
                    title: data.data.title || "",
                    description: Array.isArray(data.data.description) ? data.data.description.join("\n\n") : data.data.description || "",
                    image: data.data.image || "",
                    highlights: data.data.highlights?.length ? data.data.highlights : [""],
                });
            }
        } catch (err) {
            console.log("No about data yet, using defaults");
        }
    };

    // --- Save Handlers ---
    const saveTopbar = async () => {
        setSaving(true);
        try {
            // Fetch current global to merge
            let globalData = {};
            try {
                const { data } = await axios.get("/api/global");
                if (data) globalData = data;
            } catch (e) { /* no existing global */ }

            await axios.put("/api/global", { ...globalData, topbar });
            setMessage("Topbar saved successfully!");
        } catch (err) {
            setMessage("Error saving topbar: " + (err.response?.data?.message || err.message));
        }
        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    const saveHero = async () => {
        setSaving(true);
        try {
            await axios.put("/api/content/hero", {
                title: "Hero Slider",
                data: { slides: hero.slides },
            });
            setMessage("Hero saved successfully!");
        } catch (err) {
            setMessage("Error saving hero: " + (err.response?.data?.message || err.message));
        }
        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    const saveAbout = async () => {
        setSaving(true);
        try {
            await axios.put("/api/content/about", {
                title: "About Section",
                data: {
                    title: about.title,
                    description: about.description,
                    image: about.image,
                    highlights: about.highlights.filter(h => h.trim()),
                },
            });
            setMessage("About saved successfully!");
        } catch (err) {
            setMessage("Error saving about: " + (err.response?.data?.message || err.message));
        }
        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    // --- Image upload helper ---
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const { data } = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return typeof data === 'string' ? data : (data.url || data.secure_url || data.path);
        } catch (err) {
            console.error("Upload failed", err);
            return null;
        }
    };

    // --- Topbar Helpers ---
    const addSocial = () => setTopbar(p => ({ ...p, socials: [...p.socials, { name: "", url: "" }] }));
    const removeSocial = (i) => setTopbar(p => ({ ...p, socials: p.socials.filter((_, idx) => idx !== i) }));
    const updateSocial = (i, field, value) => {
        const updated = [...topbar.socials];
        updated[i] = { ...updated[i], [field]: value };
        setTopbar(p => ({ ...p, socials: updated }));
    };

    const addLink = () => setTopbar(p => ({ ...p, links: [...p.links, { label: "", path: "", highlight: false }] }));
    const removeLink = (i) => setTopbar(p => ({ ...p, links: p.links.filter((_, idx) => idx !== i) }));
    const updateLink = (i, field, value) => {
        const updated = [...topbar.links];
        updated[i] = { ...updated[i], [field]: value };
        setTopbar(p => ({ ...p, links: updated }));
    };

    // --- Hero Helpers ---
    const addSlide = () => setHero(p => ({ slides: [...p.slides, { image: "", heading: "", subheading: "" }] }));
    const removeSlide = (i) => setHero(p => ({ slides: p.slides.filter((_, idx) => idx !== i) }));
    const updateSlide = (i, field, value) => {
        const updated = [...hero.slides];
        updated[i] = { ...updated[i], [field]: value };
        setHero({ slides: updated });
    };
    const handleSlideImageUpload = async (i, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await handleImageUpload(file);
        if (url) updateSlide(i, "image", url);
    };

    // --- About Helpers ---
    const addHighlight = () => setAbout(p => ({ ...p, highlights: [...p.highlights, ""] }));
    const removeHighlight = (i) => setAbout(p => ({ ...p, highlights: p.highlights.filter((_, idx) => idx !== i) }));
    const updateHighlight = (i, value) => {
        const updated = [...about.highlights];
        updated[i] = value;
        setAbout(p => ({ ...p, highlights: updated }));
    };
    const handleAboutImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await handleImageUpload(file);
        if (url) setAbout(p => ({ ...p, image: url }));
    };

    const tabs = [
        { id: "topbar", label: "Top Bar" },
        { id: "hero", label: "Hero Slider" },
        { id: "about", label: "About Section" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Home Page Manager</h1>

            {message && (
                <div className={`p-3 rounded-lg text-sm ${message.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                    {message}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 border-b pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ======== TOPBAR TAB ======== */}
            {activeTab === "topbar" && (
                <div className="space-y-6">
                    {/* Social Media Links */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Social Media Links</h2>
                            <button onClick={addSocial} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                                <Plus size={16} /> Add
                            </button>
                        </div>
                        {topbar.socials.map((s, i) => (
                            <div key={i} className="flex gap-3 items-center mb-3">
                                <select
                                    value={s.name}
                                    onChange={(e) => updateSocial(i, "name", e.target.value)}
                                    className="border rounded-lg px-3 py-2 text-sm w-40"
                                >
                                    <option value="">Select</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="twitter">Twitter</option>
                                </select>
                                <input
                                    value={s.url}
                                    onChange={(e) => updateSocial(i, "url", e.target.value)}
                                    placeholder="URL"
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                />
                                <button onClick={() => removeSocial(i)} className="text-red-400 hover:text-red-600">
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Top Bar Links */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Top Bar Links</h2>
                            <button onClick={addLink} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                                <Plus size={16} /> Add
                            </button>
                        </div>
                        {topbar.links.map((l, i) => (
                            <div key={i} className="flex gap-3 items-center mb-3">
                                <input
                                    value={l.label}
                                    onChange={(e) => updateLink(i, "label", e.target.value)}
                                    placeholder="Label (e.g. Our Location)"
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                />
                                <input
                                    value={l.path}
                                    onChange={(e) => updateLink(i, "path", e.target.value)}
                                    placeholder="Path (e.g. /contact)"
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                />
                                <label className="flex items-center gap-1 text-xs text-gray-500">
                                    <input
                                        type="checkbox"
                                        checked={l.highlight || false}
                                        onChange={(e) => updateLink(i, "highlight", e.target.checked)}
                                    />
                                    Highlight
                                </label>
                                <button onClick={() => removeLink(i)} className="text-red-400 hover:text-red-600">
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button onClick={saveTopbar} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        <Save size={18} /> {saving ? "Saving..." : "Save Top Bar"}
                    </button>
                </div>
            )}

            {/* ======== HERO TAB ======== */}
            {activeTab === "hero" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Hero Slides</h2>
                            <button onClick={addSlide} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                                <Plus size={16} /> Add Slide
                            </button>
                        </div>

                        {hero.slides.map((slide, i) => (
                            <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-medium text-gray-500">Slide {i + 1}</span>
                                    {hero.slides.length > 1 && (
                                        <button onClick={() => removeSlide(i)} className="text-red-400 hover:text-red-600">
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                                        <input
                                            value={slide.heading}
                                            onChange={(e) => updateSlide(i, "heading", e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 text-sm"
                                            placeholder="Slide heading"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
                                        <input
                                            value={slide.subheading}
                                            onChange={(e) => updateSlide(i, "subheading", e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 text-sm"
                                            placeholder="Slide subheading"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            value={slide.image}
                                            onChange={(e) => updateSlide(i, "image", e.target.value)}
                                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                            placeholder="Image URL or upload"
                                        />
                                        <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-sm flex items-center gap-1">
                                            <Upload size={16} /> Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSlideImageUpload(i, e)} />
                                        </label>
                                    </div>
                                    {slide.image && (
                                        <img src={slide.image} alt="Preview" className="mt-2 h-24 object-cover rounded-lg" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={saveHero} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        <Save size={18} /> {saving ? "Saving..." : "Save Hero"}
                    </button>
                </div>
            )}

            {/* ======== ABOUT TAB ======== */}
            {activeTab === "about" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                        <h2 className="text-lg font-semibold">About Section</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                value={about.title}
                                onChange={(e) => setAbout(p => ({ ...p, title: e.target.value }))}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                placeholder="e.g. About Shikoy Pharma."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={about.description}
                                onChange={(e) => setAbout(p => ({ ...p, description: e.target.value }))}
                                rows={8}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                placeholder="Company description..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <div className="flex gap-3 items-center">
                                <input
                                    value={about.image}
                                    onChange={(e) => setAbout(p => ({ ...p, image: e.target.value }))}
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                    placeholder="Image URL or upload"
                                />
                                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-sm flex items-center gap-1">
                                    <Upload size={16} /> Upload
                                    <input type="file" accept="image/*" className="hidden" onChange={handleAboutImageUpload} />
                                </label>
                            </div>
                            {about.image && (
                                <img src={about.image} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" />
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Highlights</label>
                                <button onClick={addHighlight} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                                    <Plus size={16} /> Add
                                </button>
                            </div>
                            {about.highlights.map((h, i) => (
                                <div key={i} className="flex gap-3 items-center mb-2">
                                    <input
                                        value={h}
                                        onChange={(e) => updateHighlight(i, e.target.value)}
                                        className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                        placeholder="e.g. ISO Certified Company"
                                    />
                                    <button onClick={() => removeHighlight(i)} className="text-red-400 hover:text-red-600">
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={saveAbout} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        <Save size={18} /> {saving ? "Saving..." : "Save About"}
                    </button>
                </div>
            )}
        </div>
    );
}
