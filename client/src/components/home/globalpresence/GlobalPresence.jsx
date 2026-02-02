import { GLOBAL_PRESENCE_DATA } from "@/data/home/globalPresence.data";
import { SectionWrapper } from "@/components/shared/section-components";
import GlobalPresenceContent from "./GlobalPresenceContent";
import GlobalPresenceForm from "./GlobalPresenceForm";

export default function GlobalPresence() {
  return (
    <SectionWrapper bgColor="bg-blue-50">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <GlobalPresenceContent
          title={GLOBAL_PRESENCE_DATA.title}
          description={GLOBAL_PRESENCE_DATA.description}
          brochures={GLOBAL_PRESENCE_DATA.brochures}
        />

        <GlobalPresenceForm
          heading={GLOBAL_PRESENCE_DATA.getInTouch.heading}
          text={GLOBAL_PRESENCE_DATA.getInTouch.text}
          formFields={GLOBAL_PRESENCE_DATA.getInTouch.formFields}
          submitText={GLOBAL_PRESENCE_DATA.getInTouch.submitText}
        />
      </div>
    </SectionWrapper>
  );
}
