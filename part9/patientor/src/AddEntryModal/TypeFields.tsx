import React from 'react';
import { Field } from 'formik';
import { NumberField, TextField } from '../AddPatientModal/FormField';
import { validateDate, validateDischargeCriteria, validateOptionalDate } from './errorChecks';
import { EntryType } from '../types';

const assertNever = (): never => {
  throw new Error('Should never get here!');
};

const typeFields = (type: EntryType) => {
  switch (type) {
    case "HealthCheck":
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case "Hospital":
      return (
        <div>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
            validate={validateDate}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="discharge.criteria"
            component={TextField}
            validate={validateDischargeCriteria}
          />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sickleave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
            validate={validateOptionalDate}
          />
          <Field
            label="Sickleave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
            validate={validateOptionalDate}
          />
        </div>
      );
    default:
      return assertNever();
  }
};

const TypeFields: React.FC<{ type: EntryType }> = ({ type }) => {
  return typeFields(type);
};

export default TypeFields;