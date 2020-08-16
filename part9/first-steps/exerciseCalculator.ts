interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))