import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSafeEntries());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // Trying to access e.message without type checking leads
    // to 'Unsafe member access .message on an any value'
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    patientService.addEntryToPatient(req.params.id, newEntry);
    res.send(newEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;