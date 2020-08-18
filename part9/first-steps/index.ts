import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (height <= 0 || weight <= 0) {
      res.status(400).send({
        error: 'Height and weight must be greater than zero!'
      });
    } else {
      const bmi = calculateBmi(height, weight);
      res.send({
        weight,
        height,
        bmi
      });
    }
  } else {
    res.status(400).send({
      error: 'Malformatted parameters'
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});