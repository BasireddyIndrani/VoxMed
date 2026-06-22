import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'db_fallback.json');

// Ensure the data directory and file exist
const initFileDb = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
};

export const getConsultations = () => {
  initFileDb();
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading local file database:', error);
    return [];
  }
};

export const getConsultationById = (id) => {
  const consultations = getConsultations();
  return consultations.find(c => c.patient_id === id) || null;
};

export const saveConsultation = (consultationData) => {
  initFileDb();
  try {
    const consultations = getConsultations();
    
    // Add default values
    const newRecord = {
      ...consultationData,
      _id: consultationData._id || `local_${Date.now()}`,
      created_at: consultationData.created_at || new Date().toISOString()
    };
    
    consultations.push(newRecord);
    fs.writeFileSync(DATA_FILE, JSON.stringify(consultations, null, 2), 'utf-8');
    return newRecord;
  } catch (error) {
    console.error('Error saving to local file database:', error);
    throw error;
  }
};

export const deleteConsultationById = (id) => {
  initFileDb();
  try {
    const consultations = getConsultations();
    const filtered = consultations.filter(c => c.patient_id !== id && c._id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error deleting from local file database:', error);
    return false;
  }
};

export const clearConsultations = () => {
  initFileDb();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error clearing local file database:', error);
    return false;
  }
};

