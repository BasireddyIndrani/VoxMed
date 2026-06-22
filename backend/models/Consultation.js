import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true
  },
  transcript: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  },
  soap_note: {
    subjective: { type: String, default: '' },
    objective: { type: String, default: '' },
    assessment: { type: String, default: '' },
    plan: { type: String, default: '' }
  },
  triage: {
    condition: { type: String, default: '' },
    urgency: { type: String, enum: ['Low', 'Moderate', 'High'], default: 'Low' }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Avoid compiling the model multiple times
const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);

export default Consultation;
