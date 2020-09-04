import { Diagnosis, HealthCheckRating, NewEntry } from "../types";

const common = {
  date: "",
  specialist: "",
  description: "",
  diagnosisCodes: new Array<Diagnosis['code']>(),
};

export const getHealtCheckInitialValues = (): NewEntry => {
  return {
    ...common,
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating.Healthy
  };
};

export const getHospitalInitialValues = (): NewEntry => {
  return {
    ...common,
    type: "Hospital",
    discharge: {
      date: "",
      criteria: ""
    }
  };
};

export const getOccupationalHealthcareInitialValues = (): NewEntry => {
  return {
    ...common,
    type: "OccupationalHealthcare",
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: ""
    }
  };
};