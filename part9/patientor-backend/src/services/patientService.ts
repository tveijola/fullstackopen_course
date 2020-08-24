import patientData from '../../data/patients.json';
import { Patient, PatientSafeInfo } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getSafeEntries = (): Array<PatientSafeInfo> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

export default {
  getEntries,
  getSafeEntries
};