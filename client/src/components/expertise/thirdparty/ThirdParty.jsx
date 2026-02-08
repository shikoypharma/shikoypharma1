import React from 'react';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { thirdPartyData } from '@/data/expertise/thirdParty.data';
import ThirdPartyIntro from './ThirdPartyIntro';
import ThirdPartyProcess from './ThirdPartyProcess';
import ThirdPartyBenefits from './ThirdPartyBenefits';

export default function ThirdParty() {
    return (
        <PageLayout title={thirdPartyData.title}>
            <ThirdPartyIntro data={thirdPartyData.intro} />

            <ThirdPartyProcess
                process={thirdPartyData.process}
                timelines={thirdPartyData.timelines}
                costing={thirdPartyData.costing}
                terms={thirdPartyData.terms}
            />

            <ThirdPartyBenefits products={thirdPartyData.products} />
        </PageLayout>
    );
}
