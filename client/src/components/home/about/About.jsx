import { ABOUT_DATA } from "@/data/home/about.data";
import { SectionWrapper } from "@/components/shared/section-components";
import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";

export default function About() {
  return (
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <AboutImage image={ABOUT_DATA.image} alt="About Shikoy Pharma" />
        <AboutContent
          title={ABOUT_DATA.title}
          description={ABOUT_DATA.description}
          highlights={ABOUT_DATA.highlights}
        />
      </div>
    </SectionWrapper>
  );
}
