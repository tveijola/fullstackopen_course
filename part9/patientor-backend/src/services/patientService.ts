import patientData from '../../data/patientsInitial.json';
import { Patient, PatientSafeInfo, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return patients;
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
  getSafeEntries,
  addPatient
};