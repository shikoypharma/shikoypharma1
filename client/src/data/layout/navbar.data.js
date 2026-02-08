export const NAVBAR_DATA = [
  {
    label: "Home",
    link: "/",
  },


  {
    label: "About Us",
    basePath: "/about",
    mega: {
      columns: [
        [
          { label: "Corporate Profile", path: "corporate-profile" },
          { label: "Certifications", path: "certifications" },
        ],
        [
          { label: "Chairman’s Desk", path: "chairman-desk" },
          { label: "Our Core Team", path: "core-team" },
        ],
        [
          {
            label: "Mission, Vision & Business Values",
            path: "mission",
          },
          { label: "Our Associates", path: "associates" },
        ],
      ],
    },
  },

  {
    label: "Our Products",
    basePath: "/products",
    mega: {
      columns: [
        [
          { label: "Antipsychotic", path: "antipsychotic" },
          { label: "Antiemetics & Vertigo", path: "antiemetics-vertigo" },
          { label: "Cerebral Activators", path: "cerebral-activators" },
          { label: "Antiparkinsonian", path: "antiparkinsonian" },
          { label: "Anti-Arthritic", path: "anti-arthritic" },
          { label: "Cardiac Diabetic Range", path: "cardiac-diabetic" },
          { label: "Anti-Asthmatics", path: "anti-asthmatics" },
        ],
        [
          { label: "Anti-depressants", path: "anti-depressants" },
          { label: "Antiplatelets", path: "antiplatelets" },
          { label: "Antidiabetics", path: "antidiabetics" },
          { label: "NSAID's", path: "nsaids" },
          { label: "Anti-Allergic", path: "anti-allergic" },
          { label: "Paediatric Division", path: "paediatric-division" },
          { label: "Antimicrobials & Antibiotics", path: "antimicrobials-antibiotics" },
        ],
        [
          { label: "Anticonvulsants", path: "anticonvulsants" },
          { label: "Antibiotics", path: "antibiotics" },
          { label: "Vitamins & Minerals", path: "vitamins-minerals" },
          { label: "Antiulcer Hyperacidity", path: "antiulcer-hyperacidity" },
          { label: "Anti-Inflammatory", path: "anti-inflammatory" },
          { label: "Urology", path: "urology" },
          { label: "Anti-Hypertensives", path: "anti-hypertensives" },
        ],
        [
          { label: "Anxiolytics", path: "anxiolytics" },
          { label: "Anti-Alcoholism", path: "anti-alcoholism" },
          { label: "Antimigraine", path: "antimigraine" },
          { label: "Dermatological", path: "dermatological" },
          { label: "OTC Products", path: "otc-products" },
          { label: "Gynaecology", path: "gynaecology" },
        ],
      ],
    },
  },

  {
    label: "Infrastructure",
    basePath: "/infrastructure",
    mega: {
      columns: [
        [{ label: "Quality Control & QA", path: "quality-control" }],
        [{ label: "Operations", path: "operations" }],
        [{ label: "R&D / F&D", path: "rnd" }],
      ],
    },
  },
  {
    label: "For Doctors HCP",
    link: "/doctors",
  },
  {
    label: "Our Expertise / Services",
    basePath: "/services",
    mega: {
      columns: [
        [{ label: "Third Party Manufacturing", path: "third-party-manufacturing" }],
        [{ label: "PCD Pharma Franchise", path: "pcd-pharma-franchise" }],
        [{ label: "Pharmaceutical Exporter", path: "pharmaceutical-exporter" }],
      ],
    },
  },

  { label: "Gallery", link: "/gallery" },
  { label: "Contact Us", link: "/contact" },
];
