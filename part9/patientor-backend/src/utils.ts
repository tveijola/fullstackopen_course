import { 
  NewPatient,
  Gender,
  HealthCheckEntry,
  NewEntry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  HospitalEntry} from './types';

// It turns out that typing obj as 'any' leads to error 'Unsafe member access .member on an any value'
// for all lines where obj.member is accessed. This solution found from Typescript official documentation 
// seems to do the trick without annoying errors.
export const toNewPatient = (obj: Record<string, unknown> | null): NewPatient => {
  if (!obj) {
    throw new Error('Incorrect or missing request body!');
  }

  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
  };
};

export const toNewEntry = (obj: Record<string, unknown> | null): NewEntry => {
  if (!obj) {
    throw new Error('Incorrect or missing request body');
  }

  const type = parseType(obj.type);
  switch(type) {
    case "HealthCheck":
      return parseHealthCheckEntry(obj, type);
    case "OccupationalHealthcare":
      return parseOccupationalHealtcareEntry(obj, type);
    case "Hospital":
      return parseHospitalEntry(obj, type);
    default:
      throw new Error('Incorrect or missing parameter: type');
  }
};

const parseHealthCheckEntry = (obj: Record<string, unknown>, type: "HealthCheck"): Omit<HealthCheckEntry, 'id'> => {
  return {
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
    description: parseDescription(obj.description),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    type: type,
    healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
  };
};

const parseOccupationalHealtcareEntry = (obj: Record<string, unknown>, type: "OccupationalHealthcare"): Omit<OccupationalHealthcareEntry, 'id'> => {
  return {
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
    description: parseDescription(obj.description),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    type: type,
    employerName: parseEmployerName(obj.employerName),
    sickLeave: parseSickLeave(obj.sickLeave as Record<string, unknown>)
  };
};

const parseHospitalEntry = (obj: Record<string, unknown>, type: "Hospital"): Omit<HospitalEntry, 'id'> => {
  return {
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
    description: parseDescription(obj.description),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    type: type,
    discharge: parseDischarge(obj.discharge as Record<string, unknown>)
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

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing parameter: type');
  }
  return type;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing parameter: specialist');
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing parameter: description');
  }
  return description;
};

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
  if (!codes) {
    return undefined;
  }
  if (!(codes instanceof Array)) {
    throw new Error('Incorrect parameter: diagnosisCodes');
  }
  return codes.map(code => {
    if (!isString(code)) {
      throw new Error('Incorrect parameter: code, in: diagnosisCodes');
    }
    return code;
  });
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing parameter: gender');
  }
  return rating;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing parameter: employerName');
  }
  return name;
};

const parseSickLeave = (leave: Record<string, unknown> | null): { startDate: string, endDate: string } | undefined => {
  if (!leave) {
    return undefined;
  }
  return {
    startDate: parseDate(leave.startDate),
    endDate: parseDate(leave.endDate)
  };
};

const parseDischarge = (discharge: Record<string, unknown> | null): { date: string, criteria: string } => {
  if (!discharge) {
    throw new Error('Incorrect or missing parameter: discharge');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  };
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing parameter: criteria');
  }
  return criteria;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};
