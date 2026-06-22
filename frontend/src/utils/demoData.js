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
      subjective: "Patient reports experiencing dull, pressure-like chest pain for the past two days. Mentions that the pain is constant and worsens upon deep inspiration. Associated with shortness of breath (dyspnea). Denies radiating pain to the left arm or jaw, nausea, or sweating.",
      objective: "Patient appears in mild distress. Respiratory rate is slightly elevated at 22/min. No physical examination findings are available since this is a remote vocal consult. Suggest immediate vital check.",
      assessment: "Angina pectoris vs. acute coronary syndrome vs. pulmonary embolism vs. pleuritic chest pain. Given the presence of chest pain combined with dyspnea, cardiac or pulmonary emergencies must be ruled out.",
      plan: "1. Refer immediately to the nearest secondary/tertiary hospital or emergency department.\n2. Advise resting in a semi-upright position.\n3. Recommend administration of Aspirin 325mg PO if cardiac etiology suspected and no contraindications.\n4. Avoid any physical exertion."
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
      subjective: "Patient complains of high-grade fever for three days, accompanied by generalized body aches (myalgia), moderate headache, and mild fatigue. Reports no cough, sore throat, or urinary burning.",
      objective: "Patient is alert but fatigued. Oral temperature reported at 102°F. Hydration status appears adequate.",
      assessment: "Acute febrile illness. Potential viral fever, dengue, malaria, or enteric fever depending on regional prevalence.",
      plan: "1. Administer Paracetamol 650mg PO every 6 hours as needed for fever and pain.\n2. Encourage abundant oral hydration (ORS, coconut water, or clean water).\n3. Keep a temperature log every 4 hours.\n4. If fever persists beyond 5 days or if red flag symptoms (severe vomiting, bleeding, rash, confusion) develop, refer to primary health center (PHC)."
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
      subjective: "Patient is an elderly individual reporting bilateral knee joint pain for several months, which has severely worsened over the past week. Pain is exacerbated by walking and weight-bearing, making ambulation difficult. Notes morning stiffness lasting about 15 minutes.",
      objective: "Patient reports swelling in both knees. Joint range of motion is restricted due to pain. No warmth or erythema reported.",
      assessment: "Bilateral knee osteoarthritis flare-up vs. inflammatory arthritis.",
      plan: "1. Suggest paracetamol 500mg PO for pain management as needed. Avoid high-dose NSAIDs if renal or GI risk factors exist.\n2. Recommend local warm/cold compresses.\n3. Rest the joints during acute flare; avoid deep squatting or cross-legged sitting.\n4. Recommend evaluation at a community health center for physical exam and X-ray."
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
      subjective: "Patient reports sudden onset of moderate to severe throbbing headache, primarily unilateral, accompanied by two episodes of vomiting and sensitivity to light (photophobia). No history of head trauma.",
      objective: "Patient reports distress. Lying down in a dark room. Blood pressure is unmeasured. No focal neurological deficits reported.",
      assessment: "Acute migraine headache vs. tension-type headache vs. early meningitis.",
      plan: "1. Resting in a quiet, dark room.\n2. Administer antiemetic (e.g. Domperidone 10mg PO) followed by analgesic (e.g. Ibuprofen 400mg PO) if tolerated.\n3. Maintain hydration. Monitor for meningeal signs (neck stiffness, high fever, altered consciousness).\n4. Consult local health worker if pain remains uncontrolled for 24 hours."
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
      subjective: "Patient presents with a two-day history of acute productive cough accompanied by severe shortness of breath (dyspnea) at rest and mild fever. Reports a history of bronchial asthma but inhalers have not provided relief.",
      objective: "Patient exhibits speech dyspnea (pausing for breath while talking). Reported respiratory rate is 25 breaths per minute.",
      assessment: "Acute exacerbation of bronchial asthma vs. community-acquired pneumonia vs. acute bronchitis.",
      plan: "1. Urgent transfer to the nearest clinic or hospital with oxygen therapy facilities.\n2. Administer salbutamol nebulization or inhaler with spacer immediately if available.\n3. Keep patient in an upright sitting position to aid chest expansion.\n4. Close monitoring of oxygen saturation and respiratory effort."
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
