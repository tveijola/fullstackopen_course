import patients from '../../data/patients';
import { Patient, PatientSafeInfo, NewPatient, Entry, NewEntry } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getSafeEntries = (): Array<PatientSafeInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const addPatient = (newPatient: NewPatient): Patient => {
  const addedPatient: Patient = {
    ...newPatient,
    id: (patients.length + 1).toString(),
    entries: Array<Entry>()
  };
  patients.push(addedPatient);
  return addedPatient;
};

const addEntryToPatient = (id: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient) {
    throw new Error('Incorrect patient id');
  }

  const validEntry: Entry = {
    ...entry,
    id: (patient.entries.length + 1).toString()
  };

  patient.entries.push(validEntry);
  return patient;
};

export default {
  getEntries,
  getPatient,
  getSafeEntries,
  addPatient,
  addEntryToPatient
};