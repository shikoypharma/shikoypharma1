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
      columns: []
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
  { label: "Product Gallery", link: "/product-gallery" },
  { label: "Contact Us", link: "/contact" },
];
