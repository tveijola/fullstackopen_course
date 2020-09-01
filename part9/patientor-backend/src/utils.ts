import { NewPatient, Gender, Entry } from './types';

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
    occupation: parseOccupation(obj.occupation),
    entries: parseEntries(obj.entries)
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

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !(entries instanceof Array)) {
    throw new Error('Incorrect or missing parameter: entries');
  }
  return entries.map(entry => parseEntry(entry));
};

const parseEntry = (entry: Entry): Entry => {
  if (!entry.type || !["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(entry.type)) {
    throw new Error('Incorrect or missing parameter: entry type');
  }
  return entry;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export default toNewPatient;