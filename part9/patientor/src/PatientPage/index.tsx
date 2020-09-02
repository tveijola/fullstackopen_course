import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry } from '../types';
import { Header, Icon, Divider } from 'semantic-ui-react';

const PatientPage: React.FC = () => {

  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const fetchPatient = async () => {
    try {
      const { data: updatedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(updatedPatient));
    } catch (e) {
      console.error(e);
    }
  };

  if (!patient) {
    return null;
  }

  if (!patient.ssn) {
    fetchPatient();
    return null;
  }

  let icon = <Icon name='genderless' />;
  if (patient.gender === Gender.Female) {
    icon = <Icon name='venus' />;
  } else if (patient.gender === Gender.Male) {
    icon = <Icon name='mars' />;
  }

  const listDiagnosisCodes = (entry: Entry) => {
    if (!entry.diagnosisCodes) {
      return null;
    }
    return (
      <ul>
        {entry.diagnosisCodes.map((code, index) => {
          return (
            <li key={index}>
              {code} {diagnoses[code].name}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <Header as="h1">
        <Header.Content>{patient.name} {icon}</Header.Content>
      </Header>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      <div>Date of birth: {patient.dateOfBirth}</div>
      <Divider />
      <Header as="h2">
        Entries
      </Header>
      {patient.entries.map((entry, index) => {
        return (
          <div key={index}>
            {entry.date} <b>{entry.description}</b>
            {listDiagnosisCodes(entry)}
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;