import Consultation from '../models/Consultation.js';
import { saveConsultation, getConsultations, getConsultationById, deleteConsultationById, clearConsultations } from '../utils/fileDb.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOCK_DATA_FILE = path.join(__dirname, '..', 'data', 'mockData.json');

// Load mock data for fallback
let mockCases = [];
try {
  const rawMock = fs.readFileSync(MOCK_DATA_FILE, 'utf-8');
  mockCases = JSON.parse(rawMock);
} catch (error) {
  console.error('⚠️ Could not load mock cases. Fallbacks will use default values.', error);
}

// Generate unique Patient ID (VM-XXXX)
const generatePatientId = () => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `VM-${num}`;
};

// Fallback rules-based processor
const getMockResponse = (text, language) => {
  const normalized = (text || '').toLowerCase();
  
  // Try to find matching case by keywords
  for (const item of mockCases) {
    for (const key of item.keywords) {
      if (normalized.includes(key.toLowerCase())) {
        return {
          patient_id: generatePatientId(),
          language: language || item.language,
          transcript: text || item.transcript,
          translation: item.translation,
          soap_note: item.soap_note,
          triage: item.triage
        };
      }
    }
  }

  // Generic fallback if no keywords match
  return {
    patient_id: generatePatientId(),
    language: language || 'Vernacular',
    transcript: text || 'సహాయం కావాలి.',
    translation: text ? 'Patient reports acute onset of non-specific general symptoms requiring clinical evaluation.' : 'Patient reports general symptoms.',
    soap_note: {
      subjective: `• Chief Complaint (CC): Patient reports acute generalized symptoms.\n• History of Present Illness (HPI): Sudden onset of discomfort, mild fatigue, and unspecified symptoms of recent duration.\n• Associated Symptoms and relevant negatives: Denies shortness of breath, chest pain, palpitations, or severe vomiting.`,
      objective: `• Remote Vocal Consultation: Physical examination restricted by distance. Vocal contact only.\n• Vocal Cues & Speech Attributes: Vocal quality appears stable and clear.\n• Recommended Vitals: Immediately check patient's temperature, blood pressure, pulse rate, and oxygen saturation upon arrival.`,
      assessment: `• Primary Suspected Condition: Unspecified General Symptoms.\n• Differential Diagnoses:\n  1. Mild Viral Prodrome\n  2. Anxiety/Fatigue-induced malaise\n• Rationale: Non-specific presentation with no localized clinical signs, suggesting a low-risk category.`,
      plan: `1. Immediate Interventions: Recommend standard oral hydration and rest.\n2. Advise patient to visit local Primary Health Centre (PHC) if symptoms persist beyond 48 hours.\n3. Vitals Monitoring: Monitor body temperature and blood pressure daily.\n4. Red Flags: Seek emergency care immediately if high fever, severe pain, or breathing difficulties develop.`
    },
    triage: {
      condition: 'Unspecified General Symptoms',
      urgency: 'Low'
    }
  };
};

// Generate SOAP and Triage using Gemini REST or SDK
const generateClinicalData = async (transcript, language, userApiKey) => {
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'AIzaSyYourActualGeminiApiKeyGoesHere' || apiKey.startsWith('your_')) {
    console.log('💡 Using local mock clinical processor (Gemini API key not configured).');
    return getMockResponse(transcript, language);
  }
  try {
    // We construct a query prompt to obtain translation, SOAP note, and triage details in a single strict JSON structure.
    const prompt = `
You are an AI medical documentation assistant.

Your task is to generate a structured clinical report in SOAP format based on the given patient conversation or input.

A patient speaking ${language} says: "${transcript}"

IMPORTANT RULES:
- Do NOT include any original user input, raw conversation, transcript, or script in the output.
- Do NOT copy sentences from the input text.
- Do NOT quote or reproduce patient statements verbatim.
- Only use the input as a reference to understand meaning.
- Always rewrite everything in clean, clinical, professional medical language.
- Summarize and transform information instead of copying it.
- Keep language professional and medical.
- Remove filler words, emotions, and conversational tone.
- Ensure no original script or raw dialogue appears anywhere in the output.
- The output should contain a clinical summary of symptoms (for the translation field) and the structured SOAP note sections (Subjective, Objective, Assessment, Plan) and triage data.

Return ONLY a valid JSON object matching this schema. Do not write any markdown code block wraps (like \`\`\`json) or extra text. Just return raw JSON.

Schema:
{
  "translation": "Provide a professional, clinical summary of the patient's symptoms in English (do NOT translate verbatim, do NOT quote the patient, and do NOT copy sentences from the input text)",
  "soap_note": {
    "subjective": "Provide a detailed subjective history of the illness. Must include separate bulleted lines for:\\n• Chief Complaint (CC): [describe complaint in professional medical terminology, do NOT quote patient]\\n• History of Present Illness (HPI): [describe onset, duration, character, aggravating/alleviating factors, and severity in clinical language]\\n• Associated Symptoms and relevant negatives: [describe other symptoms present or explicitly denied by patient]",
    "objective": "Provide detailed objective observations. Must include separate bulleted lines for:\\n• Remote Vocal Consultation: [explain physical exam limitations of remote consultation]\\n• Vocal Cues & Speech Attributes: [describe vocal distress, speech rate, breathlessness, tone, etc. inferred from text/situation]\\n• Recommended Vitals: [list baseline vitals that must be measured immediately at the clinic (temp, pulse, BP, SpO2)]",
    "assessment": "Provide a detailed clinical assessment. Must include separate bulleted lines for:\\n• Primary Suspected Diagnosis: [suspected primary condition with brief clinical justification]\\n• Differential Diagnoses: [list at least 2-3 potential alternative diagnoses to rule out]\\n• Clinical Rationale: [briefly explain the reasoning behind the chosen triage urgency level]",
    "plan": "Provide a structured plan of action. Must include separate numbered lines for:\\n1. Immediate Interventions: [first aid, positioning, rest or urgent clinic routing]\\n2. Recommended Diagnostics / Workup: [relevant blood tests, imaging, ECG, etc. based on condition]\\n3. Symptomatic Treatment / Recommendations: [fluid intake, self-care, over-the-counter medication instructions if appropriate]\\n4. Red Flag Warnings & Safety Netting: [critical emergency symptoms that require immediate emergency room visitation]"
  },
  "triage": {
    "condition": "Suspected primary clinical condition",
    "urgency": "Low" | "Moderate" | "High"
  }
}
`;

    // We make a direct POST request to Gemini's REST API.
    // This is the most reliable way to avoid any SDK version mismatch or dependency loading error.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    // We use dynamic imports or fetch. In Node 18+, fetch is available globally!
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const result = await response.json();
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('Empty response from Gemini API');
    }

    // Parse the JSON
    // Clean up potential markdown formatting if Gemini ignored the instruction
    const cleanJsonText = responseText.trim().replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    const parsedData = JSON.parse(cleanJsonText);

    return {
      patient_id: generatePatientId(),
      language: language,
      transcript: transcript,
      translation: parsedData.translation || 'Translation unavailable',
      soap_note: {
        subjective: parsedData.soap_note?.subjective || '',
        objective: parsedData.soap_note?.objective || '',
        assessment: parsedData.soap_note?.assessment || '',
        plan: parsedData.soap_note?.plan || ''
      },
      triage: {
        condition: parsedData.triage?.condition || 'Suspected Condition',
        urgency: parsedData.triage?.urgency || 'Low'
      }
    };

  } catch (error) {
    console.error('❌ Error during Gemini processing, falling back to mock processor:', error);
    return getMockResponse(transcript, language);
  }
};

// CREATE Consultation
export const createConsultation = async (req, res) => {
  try {
    const { language, transcript } = req.body;

    if (!language || !transcript) {
      return res.status(400).json({ error: 'Language and transcript are required' });
    }

    console.log(`🎙️ Processing consultation - Lang: ${language}, Text: "${transcript}"`);
    const userApiKey = req.headers['x-gemini-key'];
    const processedData = await generateClinicalData(transcript, language, userApiKey);

    let savedRecord;

    if (global.useLocalFallback) {
      savedRecord = saveConsultation(processedData);
    } else {
      const consultation = new Consultation(processedData);
      savedRecord = await consultation.save();
    }

    res.status(201).json(savedRecord);
  } catch (error) {
    console.error('Error in createConsultation:', error);
    res.status(500).json({ error: 'Internal server error processing consultation' });
  }
};

// GET All Consultations
export const getConsultationsList = async (req, res) => {
  try {
    let consultations;

    if (global.useLocalFallback) {
      consultations = getConsultations();
    } else {
      consultations = await Consultation.find().sort({ created_at: -1 });
    }

    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: 'Internal server error fetching consultations' });
  }
};

// GET Single Consultation
export const getConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    let consultation;

    if (global.useLocalFallback) {
      consultation = getConsultationById(id);
    } else {
      // Find either by MongoDB ObjectId or string patient_id
      if (id.startsWith('local_') || !id.match(/^[0-9a-fA-F]{24}$/)) {
        consultation = await Consultation.findOne({ patient_id: id });
      } else {
        consultation = await Consultation.findById(id);
      }
    }

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation report not found' });
    }

    res.status(200).json(consultation);
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({ error: 'Internal server error fetching consultation' });
  }
};

// DELETE Single Consultation
export const deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (global.useLocalFallback) {
      deleted = deleteConsultationById(id);
    } else {
      if (id.startsWith('local_') || !id.match(/^[0-9a-fA-F]{24}$/)) {
        const result = await Consultation.deleteOne({ patient_id: id });
        deleted = result.deletedCount > 0;
      } else {
        const result = await Consultation.findByIdAndDelete(id);
        deleted = !!result;
      }
    }

    if (!deleted) {
      return res.status(404).json({ error: 'Consultation report not found' });
    }

    res.status(200).json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ error: 'Internal server error deleting consultation' });
  }
};

// CLEAR All Consultations
export const clearAllConsultations = async (req, res) => {
  try {
    if (global.useLocalFallback) {
      clearConsultations();
    } else {
      await Consultation.deleteMany({});
    }
    res.status(200).json({ message: 'All consultations cleared successfully' });
  } catch (error) {
    console.error('Error clearing consultations:', error);
    res.status(500).json({ error: 'Internal server error clearing consultations' });
  }
};

