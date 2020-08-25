import diagnoseData from '../../data/diagnosesInitial.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getEntries
};