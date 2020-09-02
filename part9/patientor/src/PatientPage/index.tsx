import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../types';
import { Header, Icon, Divider, Message } from 'semantic-ui-react';

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

  const assertNever = (value: never): never => {
    throw new Error(`Unrecognized entry type: ${JSON.stringify(value)}`);
  };

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

  const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

    let icon = null;
    switch (entry.healthCheckRating) {
      case 0:
        icon = <Icon name="heart" color="green" />;
        break;
      case 1:
        icon = <Icon name="heart" color="yellow" />;
        break;
      case 2:
        icon = <Icon name="heart" color="orange" />;
        break;
      case 3:
        icon = <Icon name="heart" color="red" />;
        break;
      default:
        break;
    }

    return (
      <Message>
        <Message.Header>
          {entry.date} <Icon name="doctor" size="large" />
        </Message.Header>
        <Message.Content>
          <div>{entry.description}</div>
          <div>{icon}</div>
          {listDiagnosisCodes(entry)}
        </Message.Content>
      </Message>
    );
  };

  const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <Message>
        <Message.Header>
          {entry.date} <Icon name="hospital" size="large" />
        </Message.Header>
        <Message.Content>
          <div>{entry.description}</div>
          {listDiagnosisCodes(entry)}
          <Divider />
          <div>Discharge date: {entry.discharge.date}</div>
          <div>Dischrage criteria: {entry.discharge.criteria}</div>
        </Message.Content>
      </Message>
    );
  };

  const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

    const sickLeaveInfo = (entry: OccupationalHealthcareEntry) => {
      if (entry.sickLeave) {
        return (
          <div>
            <Divider />
            <div>Sickleave period: </div>
            <div>{entry.sickLeave.startDate} -- {entry.sickLeave.endDate}</div>
          </div>
        );
      }
      return null;
    };

    return (
      <Message>
        <Message.Header>
          {entry.date} <Icon name="stethoscope" size="large" /> {entry.employerName}
        </Message.Header>
        <Message.Content>
          {entry.description}
          {listDiagnosisCodes(entry)}
          {sickLeaveInfo(entry)}
        </Message.Content>
      </Message>
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntryDetails entry={entry} />;
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

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
      <Divider />
      <Header as="h2">
        Entries
      </Header>
      {patient.entries.map((entry, index) => {
        return (
          <EntryDetails key={index} entry={entry} />
        );
      })}
    </div>
  );
};


export default PatientPage;