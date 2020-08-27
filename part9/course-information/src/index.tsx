import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, index) =>
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      )}
    </div>
  );
}

const Total: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div>
      <p>Number of exercises{` ${total}`}</p>
    </div>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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