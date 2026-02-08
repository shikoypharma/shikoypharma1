export const contactData = {
    title: "Contact Us",
    introduction: "Get in Touch - We welcome you to visit us for an informative factory visit tour.",
    offices: [
        {
            title: "Corporate Office",
            address: "Lifecare Neuro Products Ltd. B-307, Elante Offices, Industrial and Business Park, Phase 1, Chandigarh-160002, India.",
            phones: ["+91 9318058855", "+91 7876892878", "+91 7876078855"],
            emails: [
                { label: "Domestic", email: "info@lifecareneuro.com" },
                { label: "Export", email: "ib@lifecareneuro.com" }
            ]
        },
        {
            title: "Manufacturing Facilities",
            address: "Lifecare Neuro Products Ltd. 70/1 Dharampur, Sai Road, Baddi, 173205 Himachal Pradesh, India.",
            phones: ["+91 9318058855", "+91 7876892878", "+91 7876078855"],
            emails: [
                { label: "Domestic", email: "info@lifecareneuro.com" },
                { label: "Export", email: "ib@lifecareneuro.com" }
            ]
        }
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.566874577873!2d76.7865243151307!3d30.70249998164875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fec9eb9e0f319%3A0x6b77741366601b0f!2sElante%20Offices!5e0!3m2!1sen!2sin!4v1625647890123!5m2!1sen!2sin", // Approximate embed link for Elante Offices
    form: {
        title: "Send us a Message",
        fields: [
            { name: "name", label: "Your Name", type: "text", required: true },
            { name: "email", label: "Your Email", type: "email", required: true },
            { name: "phone", label: "Contact Number", type: "tel", required: true },
            { name: "location", label: "Location", type: "text", required: false },
            { name: "message", label: "Your Message", type: "textarea", required: true }
        ]
    }
};
