import { NewEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

const requiredError = "Field is required.";
const formattingError = "Field malformatted.";

const validateCommons = (values: NewEntry) => {
  const errors: { [field: string]: string } = {};
  if (!values.type) {
    errors.type = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  } else if (!Date.parse(values.date)) {
    errors.date = `${formattingError} Expected: YYYY-MM-DD`;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }
  return errors;
};

export const validateHealthCheckEntry = (values: Omit<HealthCheckEntry, 'id'>) => {
  const errors = validateCommons(values);
  if (!values.healthCheckRating && values.healthCheckRating !== 0) {
    errors.healthCheckRating = requiredError;
  } else if (isNaN(Number(values.healthCheckRating))) {
    errors.healthCheckRating = `${formattingError} Expected: [0 -- 3]`;
  } else if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
    errors.healthCheckRating = "Value out of valid range. Expected: [0 -- 3]";
  }
  return errors;
};

export const validateHospitalEntry = (values: Omit<HospitalEntry, 'id'>) => {
  const errors = validateCommons(values);
  return errors;
};

export const validateOccupationalHealthcareEntry = (values: Omit<OccupationalHealthcareEntry, 'id'>) => {
  const errors = validateCommons(values);
  if (!values.employerName) {
    errors.employerName = requiredError;
  }
  return errors;
};

export const validateDate = (date: string) => {
  let error;
  if (!date) {
    error = requiredError;
  } else if (!Date.parse(date)) {
    error = `${formattingError} Expected: YYYY-MM-DD`;
  }
  return error;
};

export const validateOptionalDate = (date: string) => {
  let error;
  if (date && !Date.parse(date)) {
    error = `${formattingError} Expected: YYYY-MM-DD`;
  }
  return error;
};

export const validateDischargeCriteria = (value: string) => {
  let error;
  if (!value) {
    error = requiredError;
  }
  return error;
};