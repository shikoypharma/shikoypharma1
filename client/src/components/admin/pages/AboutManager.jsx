import { useState } from "react";
import { User, Award, Target, Users } from "lucide-react";
import CorporateProfileForm from "../about/CorporateProfileForm";
import ChairmanDeskForm from "../about/ChairmanDeskForm";
import MissionVisionForm from "../about/MissionVisionForm";
import CoreTeamForm from "../about/CoreTeamForm";
import CertificationsForm from "../about/CertificationsForm";
import AssociatesForm from "../about/AssociatesForm";

const AboutManager = () => {
    const [activeTab, setActiveTab] = useState("corporate");

    const tabs = [
        { id: "corporate", label: "Corporate Profile", icon: <User size={18} /> },
        { id: "chairman", label: "Chairman's Desk", icon: <User size={18} /> },
        { id: "mission", label: "Mission & Vision", icon: <Target size={18} /> },
        { id: "certifications", label: "Certifications", icon: <Award size={18} /> },
        { id: "team", label: "Core Team", icon: <Users size={18} /> },
        { id: "associates", label: "Associates", icon: <Users size={18} /> },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">About Us Management</h1>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-wrap gap-2 border-b pb-2 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? "border-blue-600 text-blue-600 font-medium"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    {activeTab === "corporate" && <CorporateProfileForm />}
                    {activeTab === "chairman" && <ChairmanDeskForm />}
                    {activeTab === "mission" && <MissionVisionForm />}
                    {activeTab === "certifications" && <CertificationsForm />}
                    {activeTab === "team" && <CoreTeamForm />}
                    {activeTab === "associates" && <AssociatesForm />}
                </div>
            </div>
        </div>
    );
};

export default AboutManager;
