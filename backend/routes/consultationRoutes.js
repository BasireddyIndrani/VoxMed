import express from 'express';
import {
  createConsultation,
  getConsultationsList,
  getConsultation,
  deleteConsultation,
  clearAllConsultations
} from '../controllers/consultationController.js';

const router = express.Router();

router.post('/', createConsultation);
router.get('/', getConsultationsList);
router.post('/clear', clearAllConsultations);
router.get('/:id', getConsultation);
router.delete('/:id', deleteConsultation);

export default router;
