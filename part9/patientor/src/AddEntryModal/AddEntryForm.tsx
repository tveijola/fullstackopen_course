import React from 'react';
import { NewEntry, EntryType } from "../types";
import { useStateValue } from "../state";
import { Formik, Field, Form } from "formik";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { Grid, Button, Divider } from 'semantic-ui-react';
import { getHealtCheckInitialValues, getHospitalInitialValues, getOccupationalHealthcareInitialValues } from './InitialValues';
import { validateHealthCheckEntry, validateHospitalEntry, validateOccupationalHealthcareEntry } from './errorChecks';
import SelectTypeField, { TypeOption } from './SelectTypeField';
import TypeFields from './TypeFields';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

const assertNever = (): never => {
  throw new Error('Should never get here!');
};

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnoses }] = useStateValue();
  const [selectedType, setSelectedType] = React.useState<EntryType>("HealthCheck");

  const getInitialValues = (type: EntryType): NewEntry => {
    switch (type) {
      case "HealthCheck":
        return getHealtCheckInitialValues();
      case "Hospital":
        return getHospitalInitialValues();
      case "OccupationalHealthcare":
        return getOccupationalHealthcareInitialValues();
      default:
        return assertNever();
    }
  };

  return (
    <Formik
      initialValues={getInitialValues(selectedType)}
      onSubmit={onSubmit}
      validate={values => {
        switch (values.type) {
          case "HealthCheck":
            return validateHealthCheckEntry(values);
          case "Hospital":
            return validateHospitalEntry(values);
          case "OccupationalHealthcare":
            return validateOccupationalHealthcareEntry(values);
          default:
            return assertNever();
        }
      }}
    >
      {({ isValid, dirty, values, resetForm, setFieldValue, setFieldTouched }) => {

        const handleTypeChange = (newType: EntryType) => {
          setSelectedType(newType);
          // Reset the form with initial values for the selected type
          resetForm({ values: getInitialValues(newType) });
        };

        return (
          <Form className="form ui">
            <SelectTypeField
              label="Type"
              name="type"
              options={typeOptions}
              handleTypeChange={handleTypeChange}
            />
            <Divider />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <TypeFields type={values.type} />
            <Divider />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;