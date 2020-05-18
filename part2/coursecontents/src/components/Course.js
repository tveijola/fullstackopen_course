import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => (<h2>{course.name}</h2>)

const Content = ({ course }) => {
    return (
        <div key>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const sum = parts.reduce(
        (total, current) => (total + current.exercises),
        0
    )
    return (
        <p>
            <b>Total of {sum} exercises </b>
        </p>
    )
}

const Part = (props) => (<p>{props.part.name} {props.part.exercises}</p>)

export default Course