import React from 'react';
import { EntryType } from "../types";
import { Form } from "semantic-ui-react";
import { Field } from 'formik';

export type TypeOption = {
  value: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
  label: "Health Check" | "Hospital" | "Occupational Healthcare";
};

type SelectTypeFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
  handleTypeChange: (newValue: EntryType) => void;
};

const SelectTypeField: React.FC<SelectTypeFieldProps> = ({
  name,
  label,
  options,
  handleTypeChange
}: SelectTypeFieldProps) => {

  const [value, setValue] = React.useState<EntryType>("HealthCheck");

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    if (newType === "HealthCheck" || newType === "Hospital" || newType === "OccupationalHealthcare") {
      setValue(newType);
      handleTypeChange(newType);
    }
  };

  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown" value={value} onChange={onChange} >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
};

export default SelectTypeField;