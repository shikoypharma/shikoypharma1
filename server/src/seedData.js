import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product.js';
import { ProductCategory } from './models/ProductCategory.js';

dotenv.config();

const PRODUCT_CATEGORIES_DATA = {
    antipsychotic: {
        name: "Antipsychotics",
        description: "Antipsychotic medicines are medications primarily used to treat psychosis-related symptoms and conditions. However, taking an antipsychotic medication does not necessarily mean you have a psychosis-related symptom or condition. The reason is that such medicines play a very significant role in the treatment of other conditions as well.",
        howItWorks: "Antipsychotics work by changing how certain signals in your brain, called neurotransmitters, affect how you feel and act. If these chemicals are out of balance, you might get symptoms of psychosis, such as hallucinations and delusions. Researchers continue to learn precisely how antipsychotics help. Yet, by adjusting the balance of the chemicals in your brain, you might begin to have fewer symptoms.",
        benefits: [
            "Treating extremely difficult-to-treat (or impossible-to-treat) illnesses with different kinds of medication. Furthermore, these individuals would also require care on a 24/7 basis for the duration of their lifespan without these drugs.",
            "Research and usage history. First- and second-generation antipsychotics have a solid decades-long background of research and study behind them.",
            "There are several different antipsychotic medications. Work with your doctor to identify one that eases your symptoms with the least number of side effects.",
            "Contributions to other treatment strategies. Antipsychotics also enhance other forms of mental health treatment, such as psychotherapy, making them more effective."
        ],
        products: [
            { name: "APROPRIDE 200", composition: "Amisulpride Tablets", strength: "200 mg", image: "/products/antipsychotics/apropride-200.jpg" },
            { name: "APROPRIDE 50", composition: "Amisulpride Tablets", strength: "50 mg", image: "/products/antipsychotics/apropride-50.jpg" },
            { name: "Amisulpride Tablets I.P.", composition: "Amisulpride", strength: "200 mg SR", image: "/products/antipsychotics/amisulpride-200-sr.jpg" },
            { name: "Amisulpride Tablets I.P.", composition: "Amisulpride", strength: "300 mg", image: "/products/antipsychotics/amisulpride-300.jpg" },
            { name: "Amisulpride Tablets I.P.", composition: "Amisulpride", strength: "400 mg SR", image: "/products/antipsychotics/amisulpride-400-sr.jpg" },
            { name: "ARIPAXE 10", composition: "Aripiprazole Tablets", strength: "10 mg", image: "/products/antipsychotics/aripaxe-10.jpg" },
            { name: "BLONASER 4", composition: "Blonanserin Tablets", strength: "4 mg", image: "/products/antipsychotics/blonaser-4.jpg" },
            { name: "Chlorpromazine 100", composition: "Chlorpromazine", strength: "100 mg", image: "/products/antipsychotics/chlorpromazine-100.jpg" },
            { name: "Chlorpromazine 50", composition: "Chlorpromazine", strength: "50 mg", image: "/products/antipsychotics/chlorpromazine-50.jpg" },
            { name: "CLOZCARE 100", composition: "Clozapine Tablets", strength: "100 mg", image: "/products/antipsychotics/clozcare-100.jpg" },
            { name: "FLUPEN M", composition: "Flupenthixol & Melitracen Tablets", strength: "0.5 mg & 10 mg", image: "/products/antipsychotics/flupen-m.jpg" },
            { name: "FLUPEN 0.5", composition: "Flupentixol Tablets", strength: "0.5 mg", image: "/products/antipsychotics/flupen-0.5.jpg" },
            { name: "HALOCARE 5 DT", composition: "Haloperidol Dispersible Tablets", strength: "5 mg", image: "/products/antipsychotics/halocare-5-dt.jpg" },
            { name: "HALOCARE 1.5 DT", composition: "Haloperidol Tablets I.P.", strength: "1.5 mg", image: "/products/antipsychotics/halocare-1.5-dt.jpg" },
            { name: "MOLYPRIDE 25", composition: "Levosulpiride Tablets", strength: "25 mg", image: "/products/antipsychotics/molypride-25.jpg" },
            { name: "LC 400 SR", composition: "Lithium Carbonate Prolonged Release", strength: "400 mg", image: "/products/antipsychotics/lc-400-sr.jpg" },
            { name: "LC 300", composition: "Lithium Carbonate Tablets", strength: "300 mg", image: "/products/antipsychotics/lc-300.jpg" },
            { name: "LOXIP 10", composition: "Loxapine Capsules", strength: "10 mg", image: "/products/antipsychotics/loxip-10.jpg" },
            { name: "OLANCARE 10F", composition: "Olanzapine & Fluoxetine Tablets", strength: "10 mg & 20 mg", image: "/products/antipsychotics/olancare-10f.jpg" },
            { name: "OLANCARE 5F", composition: "Olanzapine & Fluoxetine Tablets", strength: "5 mg & 20 mg", image: "/products/antipsychotics/olancare-5f.jpg" },
            { name: "OLANCARE 5 MD", composition: "Olanzapine Mouth Dissolving Tablets", strength: "5 mg", image: "/products/antipsychotics/olancare-5-md.jpg" },
            { name: "OLANCARE 20 MD", composition: "Olanzapine Mouth Dissolving Tablets", strength: "20 mg", image: "/products/antipsychotics/olancare-20-md.jpg" },
            { name: "Olanzapine Tablets", composition: "Olanzapine", strength: "5 mg", image: "/products/antipsychotics/olanzapine-5.jpg" },
            { name: "Penfluridol 20mg Tablets", composition: "Penfluridol", strength: "20 mg", image: "/products/antipsychotics/penfluridol-20.jpg" },
            { name: "PROZOTIL MD", composition: "Prochlorperazine Maleate Mouth Dissolving Tablets", strength: "5 mg", image: "/products/antipsychotics/prozotil-md.jpg" },
            { name: "CUTAPIN-100", composition: "Quetiapine", strength: "100 mg", image: "/products/antipsychotics/cutapin-100.jpg" },
            { name: "RESTOPIN-100", composition: "Quetiapine", strength: "100 mg", image: "/products/antipsychotics/restopin-100.jpg" },
            { name: "Quetiapine 200 SR Tablets", composition: "Quetiapine Fumarate", strength: "200 mg SR", image: "/products/antipsychotics/quetiapine-200-sr.jpg" },
            { name: "QUITIN SR 300", composition: "Quetiapine Fumarate", strength: "300 mg SR", image: "/products/antipsychotics/quitin-sr-300.jpg" },
            { name: "QUITIN-100", composition: "Quetiapine Tablets", strength: "100 mg", image: "/products/antipsychotics/quitin-100.jpg" },
            { name: "QUITIN-200", composition: "Quetiapine Tablets", strength: "200 mg", image: "/products/antipsychotics/quitin-200.jpg" },
            { name: "RIZE PLUS", composition: "Risperidone & Trihexyphenidyl HCL Tablets", strength: "3 mg & 2 mg", image: "/products/antipsychotics/rize-plus.jpg" },
            { name: "RIZE 2 PLUS", composition: "Risperidone & Trihexyphenidyl HCL Tablets", strength: "2 mg & 2 mg", image: "/products/antipsychotics/rize-2-plus.jpg" },
            { name: "RIZE FORTE", composition: "Risperidone & Trihexyphenidyl HCL Tablets", strength: "4 mg & 2 mg", image: "/products/antipsychotics/rize-forte.jpg" },
            { name: "Risperidone Mouth Dissolving Tablets", composition: "Risperidone", strength: "3 mg", image: "/products/antipsychotics/risperidone-md-3.jpg" },
            { name: "RIZE 3", composition: "Risperidone Tablets", strength: "3 mg", image: "/products/antipsychotics/rize-3.jpg" },
            { name: "Trifluoperazine & Trihexyphenidyl HCl", composition: "Trifluoperazine & Trihexyphenidyl", strength: "2.5 mg", image: "/products/antipsychotics/trifluoperazine-2.5.jpg" },
            { name: "FLUDIL 10T", composition: "Trifluoperazine & Trihexyphenidyl HCl Tablets", strength: "10 mg & 2 mg", image: "/products/antipsychotics/fludil-10t.jpg" },
            { name: "FLUDIL 5T", composition: "Trifluoperazine & Trihexyphenidyl HCl Tablets", strength: "5 mg & 2 mg", image: "/products/antipsychotics/fludil-5t.jpg" },
            { name: "Trifluoperazine HCI & Chlordiazepoxide", composition: "Trifluoperazine HCI & Chlordiazepoxide", strength: "1 mg & 10 mg", image: "/products/antipsychotics/trifluoperazine-chlordiazepoxide.jpg" },
            { name: "ZIPRAL 40", composition: "Ziprasidone Capsules", strength: "40 mg", image: "/products/antipsychotics/zipral-40.jpg" },
            { name: "ZIPRAL 20", composition: "Ziprasidone Capsules", strength: "20 mg", image: "/products/antipsychotics/zipral-20.jpg" },
        ]
    },
    "anti-depressants": {
        name: "Anti-depressants",
        description: "Anti-depressants are psychiatric medications used to treat major depressive disorders, anxiety disorders, and related mental health conditions. They work by balancing neurotransmitters in the brain.",
        howItWorks: "Antidepressants primarily work by increasing the levels of serotonin, norepinephrine, and dopamine in the brain. These neurotransmitters are essential for mood regulation, motivation, and emotional well-being.",
        benefits: [
            "Effective relief from depression and anxiety symptoms",
            "Improved mood and emotional stability",
            "Enhanced quality of life and daily functioning",
            "Reduced risk of relapse with continued treatment"
        ],
        products: [
            { name: "DOXYN 10", composition: "Doxepin HCL", strength: "10 mg", image: "/products/anti-depressants/doxyn-10.jpg" },
            { name: "FLUVEN 20", composition: "Fluoxetine", strength: "20 mg", image: "/products/anti-depressants/fluven-20.jpg" },
            { name: "SERZONE 100", composition: "Nefazodone", strength: "100 mg", image: "/products/anti-depressants/serzone-100.jpg" },
            { name: "TRAZALON 50", composition: "Trazodone", strength: "50 mg", image: "/products/anti-depressants/trazalon-50.jpg" },
            { name: "VENLOR 75", composition: "Venlafaxine", strength: "75 mg", image: "/products/anti-depressants/venlor-75.jpg" },
            { name: "SERTRALINE 50", composition: "Sertraline", strength: "50 mg", image: "/products/anti-depressants/sertraline-50.jpg" },
            { name: "CITROL 10", composition: "Citalopram", strength: "10 mg", image: "/products/anti-depressants/citrol-10.jpg" },
            { name: "ESCITALOPRAM 10", composition: "Escitalopram", strength: "10 mg", image: "/products/anti-depressants/escitalopram-10.jpg" },
            { name: "PAROXETINE 10", composition: "Paroxetine", strength: "10 mg", image: "/products/anti-depressants/paroxetine-10.jpg" },
            { name: "ATOMOX 40", composition: "Atomoxetine", strength: "40 mg", image: "/products/anti-depressants/atomox-40.jpg" },
        ]
    },
    "antiemetics-vertigo": {
        name: "Antiemetics & Vertigo",
        description: "Antiemetic medications prevent or reduce nausea and vomiting, while vertigo treatment options help manage dizziness and balance disorders.",
        howItWorks: "These medications work by blocking signals to the brain that trigger nausea and vomiting, and by stabilizing the inner ear to reduce vertigo symptoms.",
        benefits: [
            "Quick relief from nausea and vomiting",
            "Reduced dizziness and vertigo symptoms",
            "Improved comfort during travel or treatment",
            "Better quality of life with symptom management"
        ],
        products: [
            { name: "DOMPERIDONE 10", composition: "Domperidone", strength: "10 mg", image: "/products/antiemetics-vertigo/domperidone-10.jpg" },
            { name: "METOCLOPRAMIDE 10", composition: "Metoclopramide", strength: "10 mg", image: "/products/antiemetics-vertigo/metoclopramide-10.jpg" },
            { name: "ONDANSETRON 4", composition: "Ondansetron", strength: "4 mg", image: "/products/antiemetics-vertigo/ondansetron-4.jpg" },
            { name: "CYCLIZINE 50", composition: "Cyclizine", strength: "50 mg", image: "/products/antiemetics-vertigo/cyclizine-50.jpg" },
            { name: "CINNARIZINE 25", composition: "Cinnarizine", strength: "25 mg", image: "/products/antiemetics-vertigo/cinnarizine-25.jpg" },
            { name: "BETAHISTINE 16", composition: "Betahistine", strength: "16 mg", image: "/products/antiemetics-vertigo/betahistine-16.jpg" },
        ]
    },
    "cerebral-activators": {
        name: "Cerebral Activators",
        description: "Cerebral activators are nootropic medications that enhance cognitive function, memory, and mental performance.",
        howItWorks: "These medications work by improving blood flow to the brain, enhancing neurotransmitter function, and protecting neural cells from damage.",
        benefits: [
            "Improved memory and concentration",
            "Enhanced mental clarity and focus",
            "Better cognitive performance",
            "Neuroprotective effects"
        ],
        products: [
            { name: "PIRACETAM 400", composition: "Piracetam", strength: "400 mg", image: "/products/cerebral-activators/piracetam-400.jpg" },
            { name: "VINPOCETINE 5", composition: "Vinpocetine", strength: "5 mg", image: "/products/cerebral-activators/vinpocetine-5.jpg" },
            { name: "ANIRACETAM 500", composition: "Aniracetam", strength: "500 mg", image: "/products/cerebral-activators/aniracetam-500.jpg" },
            { name: "OXIRACETAM 500", composition: "Oxiracetam", strength: "500 mg", image: "/products/cerebral-activators/oxiracetam-500.jpg" },
        ]
    },
    "antiparkinsonian": {
        name: "Antiparkinsonian",
        description: "Antiparkinsonian medications help manage symptoms of Parkinson's disease, including tremor, rigidity, and bradykinesia.",
        howItWorks: "These medications work by increasing dopamine levels or blocking cholinergic activity in the brain to restore motor control.",
        benefits: [
            "Reduced tremor and muscle rigidity",
            "Improved mobility and motor control",
            "Enhanced daily functioning",
            "Slowed disease progression"
        ],
        products: [
            { name: "LEVODOPA 250", composition: "Levodopa", strength: "250 mg", image: "/products/antiparkinsonian/levodopa-250.jpg" },
            { name: "BROMOCRIPTINE 2.5", composition: "Bromocriptine", strength: "2.5 mg", image: "/products/antiparkinsonian/bromocriptine-2.5.jpg" },
            { name: "TRIHEXYPHENIDYL 2", composition: "Trihexyphenidyl", strength: "2 mg", image: "/products/antiparkinsonian/trihexyphenidyl-2.jpg" },
        ]
    },
    "anti-arthritic": {
        name: "Anti-Arthritic",
        description: "Anti-arthritic medications reduce inflammation and pain associated with arthritis and joint disorders.",
        howItWorks: "These medications work by reducing inflammation in the joints and suppressing the immune response that causes arthritis.",
        benefits: [
            "Reduced joint pain and swelling",
            "Improved joint mobility",
            "Slowed disease progression",
            "Better quality of life"
        ],
        products: [
            { name: "METHOTREXATE 2.5", composition: "Methotrexate", strength: "2.5 mg", image: "/products/anti-arthritic/methotrexate-2.5.jpg" },
            { name: "SULFASALAZINE 500", composition: "Sulfasalazine", strength: "500 mg", image: "/products/anti-arthritic/sulfasalazine-500.jpg" },
            { name: "LEFLUNOMIDE 10", composition: "Leflunomide", strength: "10 mg", image: "/products/anti-arthritic/leflunomide-10.jpg" },
        ]
    },
    "cardiac-diabetic": {
        name: "Cardiac Diabetic Range",
        description: "Medications for cardiac and diabetic conditions that help manage heart health and blood sugar levels.",
        howItWorks: "These medications work through various mechanisms including improving insulin sensitivity, reducing glucose production, and supporting cardiac function.",
        benefits: [
            "Better blood sugar control",
            "Improved heart health",
            "Reduced risk of complications",
            "Enhanced overall wellness"
        ],
        products: [
            { name: "METFORMIN 500", composition: "Metformin", strength: "500 mg", image: "/products/cardiac-diabetic/metformin-500.jpg" },
            { name: "GLIBENCLAMIDE 5", composition: "Glibenclamide", strength: "5 mg", image: "/products/cardiac-diabetic/glibenclamide-5.jpg" },
            { name: "ATORVASTATIN 10", composition: "Atorvastatin", strength: "10 mg", image: "/products/cardiac-diabetic/atorvastatin-10.jpg" },
            { name: "LISINOPRIL 10", composition: "Lisinopril", strength: "10 mg", image: "/products/cardiac-diabetic/lisinopril-10.jpg" },
            { name: "AMLODIPINE 5", composition: "Amlodipine", strength: "5 mg", image: "/products/cardiac-diabetic/amlodipine-5.jpg" },
        ]
    },
    "anti-asthmatics": {
        name: "Anti-Asthmatics",
        description: "Anti-asthmatic medications help manage asthma symptoms and improve respiratory function.",
        howItWorks: "These medications work by relaxing airway muscles and reducing inflammation in the airways to improve breathing.",
        benefits: [
            "Easier breathing and reduced wheezing",
            "Better control of asthma symptoms",
            "Reduced frequency of attacks",
            "Improved quality of life"
        ],
        products: [
            { name: "SALBUTAMOL 100", composition: "Salbutamol", strength: "100 mcg", image: "/products/anti-asthmatics/salbutamol-100.jpg" },
            { name: "IPRATROPIUM 20", composition: "Ipratropium Bromide", strength: "20 mcg", image: "/products/anti-asthmatics/ipratropium-20.jpg" },
            { name: "FLUTICASONE 50", composition: "Fluticasone Propionate", strength: "50 mcg", image: "/products/anti-asthmatics/fluticasone-50.jpg" },
            { name: "MONTELUKAST 4", composition: "Montelukast", strength: "4 mg", image: "/products/anti-asthmatics/montelukast-4.jpg" },
        ]
    },
    "anticonvulsants": {
        name: "Anticonvulsants",
        description: "Anticonvulsant medications prevent and treat seizures, and are also used for mood disorders.",
        howItWorks: "These medications work by stabilizing electrical activity in the brain to prevent seizures and mood swings.",
        benefits: [
            "Seizure prevention and control",
            "Mood stabilization",
            "Reduced seizure frequency",
            "Improved safety"
        ],
        products: [
            { name: "PHENYTOIN 100", composition: "Phenytoin", strength: "100 mg", image: "/products/anticonvulsants/phenytoin-100.jpg" },
            { name: "VALPROIC ACID 200", composition: "Valproic Acid", strength: "200 mg", image: "/products/anticonvulsants/valproic-acid-200.jpg" },
            { name: "CARBAMAZEPINE 100", composition: "Carbamazepine", strength: "100 mg", image: "/products/anticonvulsants/carbamazepine-100.jpg" },
            { name: "LEVETIRACETAM 500", composition: "Levetiracetam", strength: "500 mg", image: "/products/anticonvulsants/levetiracetam-500.jpg" },
            { name: "LAMOTRIGINE 25", composition: "Lamotrigine", strength: "25 mg", image: "/products/anticonvulsants/lamotrigine-25.jpg" },
        ]
    },
    "antibiotics": {
        name: "Antibiotics",
        description: "Antibiotics are used to treat bacterial infections by killing or inhibiting the growth of bacteria.",
        howItWorks: "Antibiotics work through various mechanisms including cell wall disruption, protein synthesis inhibition, and DNA damage.",
        benefits: [
            "Effective treatment of bacterial infections",
            "Reduced infection severity",
            "Prevention of complications",
            "Quick symptom relief"
        ],
        products: [
            { name: "AMOXICILLIN 250", composition: "Amoxicillin", strength: "250 mg", image: "/products/antibiotics/amoxicillin-250.jpg" },
            { name: "CEFALEXIN 500", composition: "Cephalexin", strength: "500 mg", image: "/products/antibiotics/cefalexin-500.jpg" },
            { name: "CIPROFLOXACIN 250", composition: "Ciprofloxacin", strength: "250 mg", image: "/products/antibiotics/ciprofloxacin-250.jpg" },
            { name: "AZITHROMYCIN 250", composition: "Azithromycin", strength: "250 mg", image: "/products/antibiotics/azithromycin-250.jpg" },
            { name: "DOXYCYCLINE 100", composition: "Doxycycline", strength: "100 mg", image: "/products/antibiotics/doxycycline-100.jpg" },
            { name: "METRONIDAZOLE 400", composition: "Metronidazole", strength: "400 mg", image: "/products/antibiotics/metronidazole-400.jpg" },
        ]
    },
    "vitamins-minerals": {
        name: "Vitamins & Minerals",
        description: "Vitamin and mineral supplements support overall health and prevent nutritional deficiencies.",
        howItWorks: "These supplements provide essential micronutrients needed for various bodily functions including immune support, energy production, and bone health.",
        benefits: [
            "Enhanced immune function",
            "Improved energy levels",
            "Better nutritional status",
            "Prevention of deficiency-related diseases"
        ],
        products: [
            { name: "VITAMIN D3 1000", composition: "Vitamin D3", strength: "1000 IU", image: "/products/vitamins-minerals/vitamin-d3-1000.jpg" },
            { name: "VITAMIN B COMPLEX", composition: "B Vitamins Complex", strength: "Multi", image: "/products/vitamins-minerals/vitamin-b-complex.jpg" },
            { name: "VITAMIN C 500", composition: "Vitamin C", strength: "500 mg", image: "/products/vitamins-minerals/vitamin-c-500.jpg" },
            { name: "IRON SULPHATE 325", composition: "Iron Sulphate", strength: "325 mg", image: "/products/vitamins-minerals/iron-sulphate-325.jpg" },
            { name: "ZINC 15", composition: "Zinc", strength: "15 mg", image: "/products/vitamins-minerals/zinc-15.jpg" },
        ]
    },
    "antiulcer-hyperacidity": {
        name: "Antiulcer Hyperacidity",
        description: "Antiulcer and anti-hyperacidity medications reduce acid production and protect the gastrointestinal tract.",
        howItWorks: "These medications work by neutralizing stomach acid, reducing acid production, or forming a protective barrier in the GI tract.",
        benefits: [
            "Relief from heartburn and acidity",
            "Ulcer healing and prevention",
            "Reduced GI inflammation",
            "Improved digestive comfort"
        ],
        products: [
            { name: "OMEPRAZOLE 20", composition: "Omeprazole", strength: "20 mg", image: "/products/antiulcer-hyperacidity/omeprazole-20.jpg" },
            { name: "RANITIDINE 150", composition: "Ranitidine", strength: "150 mg", image: "/products/antiulcer-hyperacidity/ranitidine-150.jpg" },
            { name: "SUCRALFATE 1", composition: "Sucralfate", strength: "1 gm", image: "/products/antiulcer-hyperacidity/sucralfate-1.jpg" },
            { name: "PANTOPRAZOLE 40", composition: "Pantoprazole", strength: "40 mg", image: "/products/antiulcer-hyperacidity/pantoprazole-40.jpg" },
        ]
    },
    "anti-inflammatory": {
        name: "Anti-Inflammatory",
        description: "Anti-inflammatory medications reduce inflammation and associated pain throughout the body.",
        howItWorks: "These medications work by inhibiting inflammatory mediators and reducing immune response.",
        benefits: [
            "Reduced inflammation and swelling",
            "Pain relief",
            "Improved mobility",
            "Better quality of life"
        ],
        products: [
            { name: "IBUPROFEN 400", composition: "Ibuprofen", strength: "400 mg", image: "/products/anti-inflammatory/ibuprofen-400.jpg" },
            { name: "DICLOFENAC 50", composition: "Diclofenac", strength: "50 mg", image: "/products/anti-inflammatory/diclofenac-50.jpg" },
            { name: "KETOPROFEN 100", composition: "Ketoprofen", strength: "100 mg", image: "/products/anti-inflammatory/ketoprofen-100.jpg" },
        ]
    },
    "anti-hypertensives": {
        name: "Anti-Hypertensives",
        description: "Anti-hypertensive medications help manage high blood pressure and reduce cardiovascular risk.",
        howItWorks: "These medications work through various mechanisms including vasodilation, reduced cardiac output, and decreased fluid retention.",
        benefits: [
            "Controlled blood pressure",
            "Reduced cardiovascular risk",
            "Prevention of complications",
            "Improved heart health"
        ],
        products: [
            { name: "ENALAPRIL 5", composition: "Enalapril", strength: "5 mg", image: "/products/anti-hypertensives/enalapril-5.jpg" },
            { name: "METOPROLOL 50", composition: "Metoprolol", strength: "50 mg", image: "/products/anti-hypertensives/metoprolol-50.jpg" },
            { name: "HYDROCHLOROTHIAZIDE 25", composition: "Hydrochlorothiazide", strength: "25 mg", image: "/products/anti-hypertensives/hctz-25.jpg" },
            { name: "DILTIAZEM 30", composition: "Diltiazem", strength: "30 mg", image: "/products/anti-hypertensives/diltiazem-30.jpg" },
        ]
    },
    "anxiolytics": {
        name: "Anxiolytics",
        description: "Anxiolytic medications help manage anxiety disorders and anxiety symptoms.",
        howItWorks: "These medications work by enhancing GABA neurotransmitter activity to produce calming effects.",
        benefits: [
            "Reduced anxiety and worry",
            "Improved sleep quality",
            "Enhanced relaxation",
            "Better emotional balance"
        ],
        products: [
            { name: "DIAZEPAM 5", composition: "Diazepam", strength: "5 mg", image: "/products/anxiolytics/diazepam-5.jpg" },
            { name: "ALPRAZOLAM 0.5", composition: "Alprazolam", strength: "0.5 mg", image: "/products/anxiolytics/alprazolam-0.5.jpg" },
            { name: "LORAZEPAM 1", composition: "Lorazepam", strength: "1 mg", image: "/products/anxiolytics/lorazepam-1.jpg" },
            { name: "BUSPIRONE 5", composition: "Buspirone", strength: "5 mg", image: "/products/anxiolytics/buspirone-5.jpg" },
        ]
    },
    "anti-alcoholism": {
        name: "Anti-Alcoholism",
        description: "Anti-alcoholism medications support recovery and reduce cravings in alcohol dependence treatment.",
        howItWorks: "These medications work by creating aversion to alcohol, reducing cravings, or modulating brain chemistry related to addiction.",
        benefits: [
            "Reduced alcohol cravings",
            "Support for abstinence",
            "Reduced relapse risk",
            "Better treatment outcomes"
        ],
        products: [
            { name: "DISULFIRAM 250", composition: "Disulfiram", strength: "250 mg", image: "/products/anti-alcoholism/disulfiram-250.jpg" },
            { name: "NALTREXONE 50", composition: "Naltrexone", strength: "50 mg", image: "/products/anti-alcoholism/naltrexone-50.jpg" },
            { name: "ACAMPROSATE 333", composition: "Acamprosate", strength: "333 mg", image: "/products/anti-alcoholism/acamprosate-333.jpg" },
        ]
    },
    "antimigraine": {
        name: "Antimigraine",
        description: "Antimigraine medications treat acute migraine attacks and prevent migraine occurrence.",
        howItWorks: "These medications work by constricting blood vessels, reducing inflammation, and modulating neurotransmitters involved in migraine pathophysiology.",
        benefits: [
            "Quick migraine relief",
            "Reduced migraine frequency",
            "Prevention of severe attacks",
            "Improved quality of life"
        ],
        products: [
            { name: "SUMATRIPTAN 50", composition: "Sumatriptan", strength: "50 mg", image: "/products/antimigraine/sumatriptan-50.jpg" },
            { name: "RIZATRIPTAN 10", composition: "Rizatriptan", strength: "10 mg", image: "/products/antimigraine/rizatriptan-10.jpg" },
            { name: "TOPIRAMATE 25", composition: "Topiramate", strength: "25 mg", image: "/products/antimigraine/topiramate-25.jpg" },
        ]
    },
    "dermatological": {
        name: "Dermatological",
        description: "Dermatological medications treat various skin conditions and promote skin health.",
        howItWorks: "These medications work through various mechanisms including antimicrobial action, anti-inflammatory effects, or cell growth modulation.",
        benefits: [
            "Improved skin condition",
            "Reduced skin inflammation",
            "Treatment of infections",
            "Better skin appearance"
        ],
        products: [
            { name: "TRETINOIN 0.05", composition: "Tretinoin", strength: "0.05%", image: "/products/dermatological/tretinoin-0.05.jpg" },
            { name: "HYDROQUINONE 4", composition: "Hydroquinone", strength: "4%", image: "/products/dermatological/hydroquinone-4.jpg" },
            { name: "CLOTRIMAZOLE CREAM 1", composition: "Clotrimazole", strength: "1%", image: "/products/dermatological/clotrimazole-1.jpg" },
        ]
    },
    "otc-products": {
        name: "OTC Products",
        description: "Over-the-counter products available without prescription for common health concerns.",
        howItWorks: "OTC products work through various mechanisms tailored to specific health concerns and conditions.",
        benefits: [
            "Easy access without prescription",
            "Convenient self-treatment",
            "Cost-effective",
            "Wide variety of options"
        ],
        products: [
            { name: "PARACETAMOL 500", composition: "Paracetamol", strength: "500 mg", image: "/products/otc-products/paracetamol-500.jpg" },
            { name: "ASPIRIN 300", composition: "Aspirin", strength: "300 mg", image: "/products/otc-products/aspirin-300.jpg" },
            { name: "ANTACID LIQUID", composition: "Aluminum Hydroxide & Magnesium", strength: "200ml", image: "/products/otc-products/antacid-liquid.jpg" },
        ]
    },
    "gynaecology": {
        name: "Gynaecology",
        description: "Gynaecological medications address women's health concerns and reproductive health issues.",
        howItWorks: "These medications work by hormonal regulation, infection treatment, or symptom management specific to women's health.",
        benefits: [
            "Improved menstrual health",
            "Relief from gynaecological symptoms",
            "Treatment of infections",
            "Better reproductive health"
        ],
        products: [
            { name: "NORETHISTERONE 5", composition: "Norethisterone", strength: "5 mg", image: "/products/gynaecology/norethisterone-5.jpg" },
            { name: "MEFENAMIC ACID 250", composition: "Mefenamic Acid", strength: "250 mg", image: "/products/gynaecology/mefenamic-acid-250.jpg" },
            { name: "FLUCONAZOLE 150", composition: "Fluconazole", strength: "150 mg", image: "/products/gynaecology/fluconazole-150.jpg" },
        ]
    },
    "antiplatelets": {
        name: "Antiplatelets",
        description: "Antiplatelet medications prevent blood clots and reduce cardiovascular risk.",
        howItWorks: "These medications work by inhibiting platelet aggregation to prevent clot formation.",
        benefits: [
            "Reduced clot risk",
            "Cardiovascular protection",
            "Prevention of stroke and MI",
            "Improved blood flow"
        ],
        products: [
            { name: "ASPIRIN 75", composition: "Aspirin", strength: "75 mg", image: "/products/antiplatelets/aspirin-75.jpg" },
            { name: "CLOPIDOGREL 75", composition: "Clopidogrel", strength: "75 mg", image: "/products/antiplatelets/clopidogrel-75.jpg" },
            { name: "TICLOPIDINE 250", composition: "Ticlopidine", strength: "250 mg", image: "/products/antiplatelets/ticlopidine-250.jpg" },
        ]
    },
    "antidiabetics": {
        name: "Antidiabetics",
        description: "Antidiabetic medications help manage blood glucose levels in diabetes.",
        howItWorks: "These medications work by enhancing insulin secretion, improving insulin sensitivity, or reducing glucose production.",
        benefits: [
            "Better blood glucose control",
            "Reduced diabetes complications",
            "Improved metabolic health",
            "Enhanced quality of life"
        ],
        products: [
            { name: "GLIPIZIDE 5", composition: "Glipizide", strength: "5 mg", image: "/products/antidiabetics/glipizide-5.jpg" },
            { name: "PIOGLITAZONE 15", composition: "Pioglitazone", strength: "15 mg", image: "/products/antidiabetics/pioglitazone-15.jpg" },
            { name: "SITAGLIPTIN 50", composition: "Sitagliptin", strength: "50 mg", image: "/products/antidiabetics/sitagliptin-50.jpg" },
        ]
    },
    "nsaids": {
        name: "NSAID's",
        description: "Non-steroidal anti-inflammatory drugs provide pain relief and reduce inflammation.",
        howItWorks: "NSAIDs work by inhibiting cyclooxygenase enzymes to reduce prostaglandin production.",
        benefits: [
            "Effective pain relief",
            "Reduced inflammation",
            "Better mobility",
            "Improved comfort"
        ],
        products: [
            { name: "NAPROXEN 250", composition: "Naproxen", strength: "250 mg", image: "/products/nsaids/naproxen-250.jpg" },
            { name: "MELOXICAM 7.5", composition: "Meloxicam", strength: "7.5 mg", image: "/products/nsaids/meloxicam-7.5.jpg" },
            { name: "PIROXICAM 20", composition: "Piroxicam", strength: "20 mg", image: "/products/nsaids/piroxicam-20.jpg" },
        ]
    },
    "anti-allergic": {
        name: "Anti-Allergic",
        description: "Anti-allergic medications treat allergic reactions and reduce allergy symptoms.",
        howItWorks: "These medications work by blocking histamine release or receptor antagonism to prevent allergic responses.",
        benefits: [
            "Relief from allergy symptoms",
            "Reduced itching and swelling",
            "Better respiratory function",
            "Improved comfort"
        ],
        products: [
            { name: "CETIRIZINE 10", composition: "Cetirizine", strength: "10 mg", image: "/products/anti-allergic/cetirizine-10.jpg" },
            { name: "LORATADINE 10", composition: "Loratadine", strength: "10 mg", image: "/products/anti-allergic/loratadine-10.jpg" },
            { name: "FEXOFENADINE 120", composition: "Fexofenadine", strength: "120 mg", image: "/products/anti-allergic/fexofenadine-120.jpg" },
        ]
    },
    "paediatric-division": {
        name: "Paediatric Division",
        description: "Paediatric medications are specifically formulated and dosed for children.",
        howItWorks: "These medications use child-appropriate formulations and dosages for treating various pediatric conditions.",
        benefits: [
            "Safe for children",
            "Appropriate dosing",
            "Better compliance",
            "Effective pediatric treatment"
        ],
        products: [
            { name: "PARACETAMOL SYRUP 120", composition: "Paracetamol", strength: "120mg/5ml", image: "/products/paediatric-division/paracetamol-syrup-120.jpg" },
            { name: "IBUPROFEN SYRUP 100", composition: "Ibuprofen", strength: "100mg/5ml", image: "/products/paediatric-division/ibuprofen-syrup-100.jpg" },
            { name: "AMOXICILLIN SUSPENSION 125", composition: "Amoxicillin", strength: "125mg/5ml", image: "/products/paediatric-division/amoxicillin-susp-125.jpg" },
        ]
    },
    "antimicrobials-antibiotics": {
        name: "Antimicrobials & Antibiotics",
        description: "Antimicrobial and antibiotic medications treat infections caused by bacteria and other microorganisms.",
        howItWorks: "These medications work by killing microorganisms or inhibiting their growth through various mechanisms.",
        benefits: [
            "Effective infection treatment",
            "Reduced infection severity",
            "Prevention of complications",
            "Improved recovery"
        ],
        products: [
            { name: "TETRACYCLINE 250", composition: "Tetracycline", strength: "250 mg", image: "/products/antimicrobials-antibiotics/tetracycline-250.jpg" },
            { name: "CLARITHROMYCIN 500", composition: "Clarithromycin", strength: "500 mg", image: "/products/antimicrobials-antibiotics/clarithromycin-500.jpg" },
            { name: "FLUOROQUINOLONE 500", composition: "Fluoroquinolone", strength: "500 mg", image: "/products/antimicrobials-antibiotics/fluoroquinolone-500.jpg" },
        ]
    },
    "urology": {
        name: "Urology",
        description: "Urological medications treat urinary tract conditions and related issues.",
        howItWorks: "These medications work through various mechanisms to address urological symptoms and conditions.",
        benefits: [
            "Relief from urinary symptoms",
            "Treatment of infections",
            "Improved urinary function",
            "Better quality of life"
        ],
        products: [
            { name: "NITROFURANTOIN 100", composition: "Nitrofurantoin", strength: "100 mg", image: "/products/urology/nitrofurantoin-100.jpg" },
            { name: "TAMSULOSIN 0.4", composition: "Tamsulosin", strength: "0.4 mg", image: "/products/urology/tamsulosin-0.4.jpg" },
            { name: "FINASTERIDE 5", composition: "Finasteride", strength: "5 mg", image: "/products/urology/finasteride-5.jpg" },
        ]
    },
};

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data (optional, but good for clean seed)
        // await ProductCategory.deleteMany({});
        // await Product.deleteMany({});

        for (const [slug, data] of Object.entries(PRODUCT_CATEGORIES_DATA)) {
            console.log(`Processing category: ${data.name}`);

            // Upsert Category
            const category = await ProductCategory.findOneAndUpdate(
                { slug: slug },
                {
                    name: data.name,
                    slug: slug,
                    description: data.description,
                    howItWorks: data.howItWorks,
                    benefits: data.benefits
                },
                { upsert: true, new: true }
            );

            // Determine Label
            const getLabel = (catSlug, prodName) => {
                const name = prodName.toLowerCase();
                if (catSlug === 'antipsychotic' || catSlug === 'anti-depressants' || catSlug === 'anxiolytics' || catSlug === 'anti-alcoholism') return 'Psychiatric';
                if (catSlug === 'cerebral-activators' || catSlug === 'antiparkinsonian' || catSlug === 'anticonvulsants' || catSlug === 'antimigraine') return 'Neuro';
                if (catSlug === 'dermatological') return 'Derma';
                if (catSlug === 'antidiabetics') return 'Diabetic';
                if (catSlug === 'anti-hypertensives' || catSlug === 'antiplatelets') return 'Cardiac';

                // Cardiac Diabetic Range - Split based on name/composition
                if (catSlug === 'cardiac-diabetic') {
                    if (name.includes('metformin') || name.includes('glibenclamide') || name.includes('glimepiride') || name.includes('voglibose')) return 'Diabetic';
                    return 'Cardiac';
                }

                return 'General';
            };

            // Process Products
            if (data.products && data.products.length > 0) {
                for (const prod of data.products) {
                    await Product.findOneAndUpdate(
                        { name: prod.name },
                        {
                            name: prod.name,
                            slug: prod.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                            category: category.name, // Link by name as per current Product model
                            composition: prod.composition,
                            packing: prod.strength, // Mapping strength to packing
                            brand: "Lifecare", // Default brand for seeded data
                            label: getLabel(slug, prod.name),
                            images: [prod.image] // Use the image from data
                        },
                        { upsert: true, new: true }
                    );
                }
                console.log(`Processed ${data.products.length} products for ${data.name}`);
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
