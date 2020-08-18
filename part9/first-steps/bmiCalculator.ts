interface bmiArguments {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): bmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values must be numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0) {
    throw new Error('Height and weight must be greater than zero!');
  }
  const bmi = weight / (height / 100) ** 2;
  if (bmi <= 15) return 'Very severely underweight';
  if (bmi <= 16) return 'Severely underweight';
  if (bmi <= 18.5) return 'Underweight';
  if (bmi <= 25) return 'Normal (healthy weight)';
  if (bmi <= 30) return 'Overweight';
  if (bmi <= 35) return 'Obese Class I (Moderetely obese)';
  if (bmi <= 40) return 'Obese Class II (Severely obese)';
  return 'Obese Class III (Very severely obese)';
}

// Check if ran directly or imported as a module
if (require.main === module) {
  try {
    const arg = parseBmiArguments(process.argv);
    console.log(calculateBmi(arg.height, arg.weight));
  } catch (error) {
    console.log('ERROR! Message:', error.message);
  }
}

export { calculateBmi };