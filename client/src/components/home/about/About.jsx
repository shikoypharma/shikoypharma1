import { useState, useEffect } from "react";
import axios from "axios";
import { ABOUT_DATA } from "@/data/home/about.data";
import { SectionWrapper } from "@/components/shared/section-components";
import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";

export default function About() {
  const [data, setData] = useState(ABOUT_DATA);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data: res } = await axios.get("/api/content/about");
        if (res?.data) {
          setData({
            title: res.data.title || ABOUT_DATA.title,
            description: res.data.description
              ? (Array.isArray(res.data.description) ? res.data.description : [res.data.description])
              : ABOUT_DATA.description,
            image: res.data.image || ABOUT_DATA.image,
            highlights: res.data.highlights?.length ? res.data.highlights : ABOUT_DATA.highlights,
          });
        }
      } catch (err) {
        // Fallback to static data
      }
    };
    fetchAbout();
  }, []);

  return (
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <AboutImage image={data.image} alt="About Shikoy Pharma" />
        <AboutContent
          title={data.title}
          description={data.description}
          highlights={data.highlights}
        />
      </div>
    </SectionWrapper>
  );
}
