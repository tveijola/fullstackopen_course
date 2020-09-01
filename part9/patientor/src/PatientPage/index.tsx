import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { Header, Icon } from 'semantic-ui-react';

const PatientPage: React.FC = () => {

  const [{ patients }, dispatch] = useStateValue();
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
  }

  let icon = <Icon name='genderless' />;
  if (patient.gender === Gender.Female) {
    icon = <Icon name='venus' />;
  } else if (patient.gender === Gender.Male) {
    icon = <Icon name='mars' />;
  }

  return (
    <div>
      <Header as="h1">
        <Header.Content>{patient.name} {icon}</Header.Content>
      </Header>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      <div>Date of birth: {patient.dateOfBirth}</div>
    </div>
  );
};

export default PatientPage;