import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseArguments, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const body = req.body as exerciseArguments;
  if (!body.daily_exercises || !body.target) {
    res.status(400).json({
      error: 'parameters missing'
    });
  } else if (body.daily_exercises.some(dayHours => isNaN(Number(dayHours))) || isNaN(body.target)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  } else {
    const result = calculateExercises(body);
    res.json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});