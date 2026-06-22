export const DEMO_PRESETS = [
  {
    id: "demo-1",
    language: "Telugu",
    label: "Chest Pain & Dyspnea (High Urgency)",
    transcript: "నాకు రెండు రోజులుగా ఛాతిలో నొప్పి ఉంది. శ్వాస తీసుకోవడం కష్టం.",
    translation: "I have had pain in my chest for two days. It is difficult to breathe.",
    triage: {
      condition: "Acute Chest Pain / Possible Coronary Syndrome",
      urgency: "High"
    },
    soap_note: {
      subjective: "• Chief Complaint (CC): Severe chest pain for 2 days.\n• History of Present Illness (HPI): Dull, pressure-like chest pain of constant nature, worsening significantly upon deep inspiration (pleuritic description). Associated with progressive dyspnea.\n• Associated Symptoms: Patient denies radiation to left arm or jaw, nausea, vomiting, or diaphoresis.",
      objective: "• Remote Vocal Consultation: Physical examination restricted by distance. Vocal contact only.\n• Vocal Cues & Speech Attributes: Speech exhibits moderate distress and slight breathlessness between sentences.\n• Recommended Vitals: Prompt evaluation of Blood Pressure, ECG, Heart Rate, and Oxygen Saturation (SpO2).",
      assessment: "• Primary Suspected Diagnosis: Suspected Acute Coronary Syndrome (ACS) vs. Pleuritic Chest Pain.\n• Differential Diagnoses:\n  1. Angina pectoris\n  2. Pulmonary embolism\n  3. Pericarditis / Costochondritis\n• Clinical Rationale: Cardiopulmonary emergencies must be ruled out immediately due to the combination of chest pressure and shortness of breath.",
      plan: "1. Immediate Interventions: Refer immediately to the nearest Emergency Department or Tertiary Hospital.\n2. Patient Positioning: Advise patient to rest in a semi-Fowler's (upright) position.\n3. Initial Therapy: Recommend Aspirin 325mg PO chewed immediately if no contraindications exist.\n4. Red Flag Warnings: Seek emergency transport. Avoid all physical exertion."
    }
  },
  {
    id: "demo-2",
    language: "Hindi",
    label: "High Fever & Body Ache (Moderate Urgency)",
    transcript: "मुझे तीन दिनों से बहुत तेज बुखार है और बदन में दर्द है।",
    translation: "I have had a very high fever for three days and my body aches.",
    triage: {
      condition: "Acute Febrile Illness / Possible Viral Fever",
      urgency: "Moderate"
    },
    soap_note: {
      subjective: "• Chief Complaint (CC): High-grade fever and generalized myalgia for 3 days.\n• History of Present Illness (HPI): Acute onset of high-grade fever, accompanied by generalized myalgia, moderate headache, and severe fatigue. Fever is reported as continuous.\n• Associated Symptoms: Denies dry cough, sore throat, vomiting, rash, or burning micturition.",
      objective: "• Remote Vocal Consultation: Limited to voice analysis. No physical examination.\n• Vocal Cues & Speech Attributes: Voice sounds weak and fatigued, but patient is coherent and oriented.\n• Recommended Vitals: Measure core temperature, blood pressure, pulse, and check for skin rashes.",
      assessment: "• Primary Suspected Diagnosis: Acute Febrile Illness of suspected viral etiology.\n• Differential Diagnoses:\n  1. Dengue Fever / Malaria\n  2. Enteric Fever (Typhoid)\n  3. Influenza / COVID-19\n• Clinical Rationale: High-grade fever for 3 days with myalgia requires monitoring for local endemic vector-borne diseases.",
      plan: "1. Immediate Interventions: Keep patient cool, rest, and start sponge baths if temperature exceeds 103°F.\n2. Recommended Diagnostics: Advise Complete Blood Count (CBC) and malaria smear if fever persists for another 24 hours.\n3. Symptomatic Treatment: Tab Paracetamol 650mg PO every 6 hours as needed for fever/pain. Maintain rich fluid intake (ORS, coconut water).\n4. Red Flag Warnings: Seek urgent care if patient develops persistent vomiting, skin rashes, nosebleeds, or confusion."
    }
  },
  {
    id: "demo-3",
    language: "Tamil",
    label: "Knee Pain & Limited Mobility (Low Urgency)",
    transcript: "எனக்கு இரண்டு முழங்கால்களிலும் கடுமையான வலி உள்ளது, நடக்க முடியவில்லை.",
    translation: "I have severe pain in both of my knees and I am unable to walk.",
    triage: {
      condition: "Bilateral Knee Osteoarthritis Flare-Up",
      urgency: "Low"
    },
    soap_note: {
      subjective: "• Chief Complaint (CC): Chronic bilateral knee pain, acutely worsened over the past week.\n• History of Present Illness (HPI): Patient reports long-standing pain in both knees for several months. Pain has acutely worsened, rendering the patient unable to walk or bear weight comfortably. Morning stiffness is reported, lasting approximately 15 minutes.\n• Associated Symptoms: Reports bilateral knee swelling; denies fever, chills, or pain in other joints.",
      objective: "• Remote Vocal Consultation: Joint examination and range of motion tests cannot be physically performed.\n• Vocal Cues & Speech Attributes: Slow, deliberate speech tone, consistent with chronic discomfort, but no acute respiratory distress.\n• Recommended Vitals: Measure patient weight, blood pressure, and visually inspect for joint erythema or deformity.",
      assessment: "• Primary Suspected Diagnosis: Bilateral Knee Osteoarthritis Flare-Up.\n• Differential Diagnoses:\n  1. Inflammatory Arthritis (e.g., Rheumatoid Arthritis)\n  2. Gouty Arthropathy\n  3. Anserine Bursitis\n• Clinical Rationale: Slowly progressive bilateral joint pain with acute functional impairment (inability to walk) is highly suggestive of osteoarthritis flare-up.",
      plan: "1. Immediate Interventions: Joint rest during the acute flare. Avoid deep squatting, kneeling, or sitting cross-legged.\n2. Recommended Diagnostics: Plain X-ray of bilateral knees (standing AP and lateral views) and serum Uric Acid / Rheumatoid Factor checks.\n3. Symptomatic Treatment: Tab Paracetamol 500mg PO every 8 hours as needed. Apply warm or cold compresses locally to the knees.\n4. Red Flag Warnings: Seek medical review if a single joint becomes hot, highly erythematous, and accompanied by high fever (concerning for septic arthritis)."
    }
  },
  {
    id: "demo-4",
    language: "Kannada",
    label: "Headache & Vomiting (Moderate Urgency)",
    transcript: "ನನಗೆ ತಲೆನೋವು ಇದೆ ಮತ್ತು ವಾಂತಿ ಬರುತ್ತದೆ.",
    translation: "I have a headache and I am vomiting.",
    triage: {
      condition: "Acute Headache with Vomiting / Possible Migraine",
      urgency: "Moderate"
    },
    soap_note: {
      subjective: "• Chief Complaint (CC): Headache and vomiting for 1 day.\n• History of Present Illness (HPI): Sudden onset of moderate to severe throbbing headache, primarily unilateral, accompanied by two episodes of vomiting. Sensitivity to light (photophobia) and sound (phonophobia) is reported.\n• Associated Symptoms: Denies head trauma, neck stiffness, visual field defects, or fever.",
      objective: "• Remote Vocal Consultation: Limited vocal analysis. Neurological examination is restricted.\n• Vocal Cues & Speech Attributes: Voice tone is quiet, consistent with photophobia/headache distress. Patient is alert and oriented.\n• Recommended Vitals: Check Blood Pressure, Temperature, and Pulse Rate.",
      assessment: "• Primary Suspected Diagnosis: Acute Migraine Attack.\n• Differential Diagnoses:\n  1. Tension Headache\n  2. Early Viral Meningitis (must monitor for neck stiffness)\n  3. Increased Intracranial Pressure\n• Clinical Rationale: Throbbing unilateral headache with photophobia and vomiting is classic for migraine flare, but red flags must be monitored.",
      plan: "1. Immediate Interventions: Rest in a quiet, dark room. Apply cold forehead compresses.\n2. Recommended Diagnostics: None indicated initially unless neurological changes occur.\n3. Symptomatic Treatment: Recommend antiemetic (e.g. Domperidone 10mg PO) followed by analgesic (e.g. Ibuprofen 400mg PO) if vomiting subsides. Maintain hydration.\n4. Red Flag Warnings: Seek emergency care if patient develops stiff neck, sudden high fever, altered mental status, or the 'worst headache of life'."
    }
  },
  {
    id: "demo-5",
    language: "Malayalam",
    label: "Severe Cough & Shortness of Breath (High Urgency)",
    transcript: "കഴിഞ്ഞ രണ്ട് ദിവസമായി എനിക്ക് കടുത്ത ചുമയും ശ്വാസതടസ്സവുമുണ്ട്.",
    translation: "I have had a severe cough and shortness of breath for the past two days.",
    triage: {
      condition: "Respiratory Infection / Suspected Pneumonia vs. Asthma Flare",
      urgency: "High"
    },
    soap_note: {
      subjective: "• Chief Complaint (CC): Severe productive cough and shortness of breath for 2 days.\n• History of Present Illness (HPI): Acute onset of productive cough producing thick sputum, accompanied by severe shortness of breath (dyspnea) at rest. Patient has a known history of bronchial asthma but reports rescue inhalers have not provided relief.\n• Associated Symptoms: Reports low-grade fever and mild chest tightness; denies hemoptysis or night sweats.",
      objective: "• Remote Vocal Consultation: Auscultation is not possible.\n• Vocal Cues & Speech Attributes: Speech exhibits marked shortness of breath, with frequent pauses between words (speech dyspnea).\n• Recommended Vitals: Measure Oxygen Saturation (SpO2) and Respiratory Rate immediately.",
      assessment: "• Primary Suspected Diagnosis: Acute Asthma Exacerbation vs. Community-Acquired Pneumonia.\n• Differential Diagnoses:\n  1. Acute Bronchitis\n  2. Pulmonary Congestion\n  3. COVID-19 / Influenza\n• Clinical Rationale: Shortness of breath at rest, asthma history with poor inhaler response, and visible speech dyspnea indicate high-urgency respiratory compromise.",
      plan: "1. Immediate Interventions: Urgent transfer to the nearest health facility with nebulization/oxygen support. Keep patient sitting upright.\n2. Recommended Diagnostics: Urgent Chest X-ray, Complete Blood Count (CBC), and continuous Pulse Oximetry.\n3. Symptomatic Treatment: Administer Salbutamol/Ipratropium nebulization or inhaler with spacer immediately if available. Monitor breathing rate.\n4. Red Flag Warnings: Call emergency response immediately if cyanosis (blue lips/nails), silent chest, or confusion develops."
    }
  }
];

export const LANGUAGES = [
  { code: 'te', name: 'Telugu', localName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', localName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', localName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', localName: 'മലയാളം' }
];

export const PIPELINE_STAGES = [
  { key: 'recording', label: 'Recording / Upload', icon: '🎙️', desc: 'Capturing patient voice data' },
  { key: 'translation', label: 'Translation', icon: '🌐', desc: 'Converting vernacular into English' },
  { key: 'analysis', label: 'AI Triage & Analysis', icon: '🧠', desc: 'Analyzing symptoms and determining urgency' },
  { key: 'soap', label: 'SOAP Note Generation', icon: '📋', desc: 'Structuring clinical Subjective, Objective, Assessment, Plan' },
  { key: 'pdf', label: 'PDF Compilation', icon: '📄', desc: 'Creating hospital-ready downloadable report' }
];
