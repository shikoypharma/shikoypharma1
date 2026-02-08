import React from 'react';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { pcdFranchiseData } from '@/data/expertise/pcdFranchise.data';
import PCDIntro from './PCDIntro';
import PCDWhyChoose from './PCDWhyChoose';
import PCDProducts from './PCDProducts';
import PCDFAQ from './PCDFAQ';

export default function PCDFranchise() {
    return (
        <PageLayout title={pcdFranchiseData.title}>
            <PCDIntro
                intro={pcdFranchiseData.intro}
                neuroFranchise={pcdFranchiseData.neuroFranchise}
            />
            <PCDWhyChoose
                whyChooseUs={pcdFranchiseData.whyChooseUs}
                benefits={pcdFranchiseData.benefits}
            />
            <PCDProducts products={pcdFranchiseData.products} />
            <PCDFAQ faq={pcdFranchiseData.faq} />
        </PageLayout>
    );
}
