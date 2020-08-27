import React from "react";
import ReactDOM from "react-dom";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtended extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartExtended {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartExtended {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartCustom {
  name: "Optional course part";
  exerciseCount: number;
  description: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartCustom;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimination union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <b>{part.name}</b> <br />
          {`Exercise count: ${part.exerciseCount}`} <br />
          {`Description: ${part.description}`}
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <b>{part.name}</b> <br />
          {`Exercise count: ${part.exerciseCount}`} <br />
          {`Group Projects: ${part.groupProjectCount}`}
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <b>{part.name}</b> <br />
          {`Exercise count: ${part.exerciseCount}`} <br />
          {`Description: ${part.description}`} <br />
          {`Exercise submission link: ${part.exerciseSubmissionLink}`}
        </div>
      );
    case "Optional course part":
      return (
        <div>
          <b>{part.name}</b> <br />
          {`Exercise count: ${part.exerciseCount}`} <br />
          {`Description: ${part.description}`} <br />
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, index) =>
        <p key={index}>
          <Part part={part} />
        </p>
      )}
    </div>
  );
};

const Total: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div>
      <p>Number of exercises{` ${total}`}</p>
    </div>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Optional course part",
      exerciseCount: 9,
      description: "This is an optional part for extra credit"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));