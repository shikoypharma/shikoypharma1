export const contactData = {
    title: "Contact Us",
    introduction: "Get in touch with us for any inquiries or support.",
    offices: [
        {
            title: "Corporate Office",
            address: "Shikoy Pharma, Corporate Address",
            phones: ["+91 XXXXX XXXXX"],
            emails: [
                { label: "General", email: "info@shikoypharma.com" }
            ]
        }
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113642.50201395727!2d80.85966468792019!3d26.832961529141075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709282305542!5m2!1sen!2sin",
    form: {
        title: "Send us a Message",
        fields: [
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email Address", type: "email", required: true },
            { name: "phone", label: "Phone Number", type: "tel", required: false },
            { name: "location", label: "Location", type: "text", required: false },
            { name: "message", label: "Your Message", type: "textarea", required: true }
        ]
    }
};
