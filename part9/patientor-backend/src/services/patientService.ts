import patients from '../../data/patients';
import { Patient, PatientSafeInfo, NewPatient } from '../types';

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
    id: (patients.length + 1).toString()
  };
  patients.push(addedPatient);
  return addedPatient;
};

export default {
  getEntries,
  getPatient,
  getSafeEntries,
  addPatient
};