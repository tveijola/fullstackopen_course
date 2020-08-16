interface exerciseArguments {
  hours: Array<number>;
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): exerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && args.slice(3).every(val => !isNaN(Number(val)))) {
    return {
      hours: args.slice(3).map(val => Number(val)),
      target: Number(args[2])
    }
  } else {
    throw new Error('Provided values invalid');
  }
}

const calculateExercises = (values: exerciseArguments): Result => {
  const { hours, target } = values;
  if (target <= 0) {
    throw new Error('Target must be greater than zero!');
  }
  const average = hours.reduce((total, current) => total + current) / hours.length;
  const precentile = average / target;
  let rating = 1;
  let ratingDescription = '';
  if (precentile >= 1) {
    rating = 3;
    ratingDescription = 'You achieved your target!';
  } else if (precentile >= 0.75) {
    rating = 2;
    ratingDescription = 'You didn\'t quite reach your target, but good effort!';
  } else {
    rating = 1;
    ratingDescription = 'You could have done better, perhaps next week!';
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(dayHours => dayHours > 0).length,
    target: target,
    average: average,
    success: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
  }
}

try {
  const arg = parseExerciseArguments(process.argv);
  console.log(calculateExercises(arg));
} catch (error) {
  console.log('ERROR! Message:', error.message);
}