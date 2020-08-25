import { NewPatient } from './types';

// It turns out that typing obj as 'any' leads to error 'Unsafe member access .member on an any value'
// for all lines where obj.member is accessed. This solution found from Typescript official documentation 
// seems to do the trick without annoying errors.
const toNewPatient = (obj: Record<string, unknown> | null): NewPatient => {
  if (!obj) {
    throw new Error('Incorrect or missing request body!');
  }

  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation)
  };
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing parameter: name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing parameter: date');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || ssn.length !== 11) {
    throw new Error('Incorrect or missing parameter: ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing parameter: gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing parameter: occupation');
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): boolean => {
  return ['male', 'female', 'other'].includes(gender.toLowerCase());
};

export default toNewPatient;