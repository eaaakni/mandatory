import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Questions from "./Questions";

const questions = [
    {
        title: "What is going on",
        question:"Is the app working",
        answers: [
            {
                text: "Maybe",
                votes: 1},
            {
                text: "Yes",
                votes: 1},
            {
                text: "No",
                votes: 2}
        ]
    },
    {
        title: "Hi",
        question:"Hallo",
        answers: [
            {
                text: "Maybe",
                votes: 1},
            {
                text: "Yes",
                votes: 1},
            {
                text: "No",
                votes: 2}
        ]
    },
    {
        title: "Does it work this time",
        question:"Will the test be okay?",
        answers: [
            {
                text: "Maybe",
                votes: 1},
            {
                text: "Yes",
                votes: 1},
            {
                text: "No",
                votes: 2}
        ]
    }
];

it('renders Questions with title', () => {
    const {getAllByText} = render(<Questions data={questions}/>);
    expect(getAllByText(/Questions/i)[0]).toBeInTheDocument();
});

it('renders Questions with Question titles', () => {
    const {getByText} = render(<Questions data={questions}/>);
    expect(getByText(/What is going on/i)).toBeInTheDocument();
    expect(getByText(/Hi/i)).toBeInTheDocument();
    expect(getByText(/Does it work this time/i)).toBeInTheDocument();
});

it('does not render answers here', () => {
    const {queryByText} = render(<Questions data={questions}/>);
    expect(queryByText(questions[0].answers[0])).toBeNull();
    expect(queryByText(questions[0].answers[1])).toBeNull();
});