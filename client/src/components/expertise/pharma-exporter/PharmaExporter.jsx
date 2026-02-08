import React from 'react';
import PageLayout from '@/components/layout/pageLayout/pageLayout';
import { exporterData } from '@/data/expertise/exporter.data';
import ExporterIntro from './ExporterIntro';
import ExporterWhyChoose from './ExporterWhyChoose';
import ExporterProcess from './ExporterProcess';
import ExporterProducts from './ExporterProducts';

export default function PharmaExporter() {
    return (
        <PageLayout title={exporterData.title}>
            <ExporterIntro
                intro={exporterData.intro}
                globalPresence={exporterData.globalPresence}
            />
            <ExporterWhyChoose whyChooseUs={exporterData.whyChooseUs} />
            <ExporterProcess exportProcess={exporterData.exportProcess} />
            <ExporterProducts products={exporterData.products} />
        </PageLayout>
    );
}
