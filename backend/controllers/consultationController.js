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
    translation: text ? `I need assistance. (Mock translated: ${text})` : 'I need assistance.',
    soap_note: {
      subjective: `Patient reports general symptoms: "${text || 'No text provided'}". No specific pain localized in major areas.`,
      objective: 'No physical examination available. General vocal contact established.',
      assessment: 'Unspecified symptoms. Needs direct clinical evaluation by a medical officer.',
      plan: '1. Standard hydration and rest.\n2. Advise visit to local Primary Health Centre (PHC) if symptoms persist.\n3. Monitor vitals daily.'
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
You are a professional clinical documentation assistant.
A patient speaking ${language} says: "${transcript}"

Task:
1. Translate the patient's statement into accurate, clinical English.
2. Convert this clinical description into a structured medical SOAP note.
3. Perform a triage assessment determining the possible condition and urgency level. Urgency level must be one of: "Low", "Moderate", "High". (e.g., chest pain with breathing difficulty is High; mild joint pain is Low; high fever is Moderate).

Return ONLY a valid JSON object matching this schema. Do not write any markdown code block wraps (like \`\`\`json) or extra text. Just return raw JSON.

Schema:
{
  "translation": "English translation of patient's original statement",
  "soap_note": {
    "subjective": "Subjective history, chief complaints, symptoms described by the patient",
    "objective": "Objective findings (mention this is a remote vocal consultation, note voice distress level or reported vital facts like temperature if mentioned)",
    "assessment": "Differential diagnoses or possible conditions based on clinical presentation",
    "plan": "Next steps, recommendation, medications if applicable, or referral urgency instructions"
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

