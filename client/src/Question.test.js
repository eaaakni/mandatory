import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from './Question.js';

// Some test data for the tests.
const question = {
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
};

it('renders the name of the question', () => {
    const comp = <Question getQuestion={_ => question}/>;
    const {getByText} = render(comp);
    expect(getByText(question.title)).toBeInTheDocument();
});

it('renders the "answers" header', () => {
    const comp = <Question getQuestion={_ => question}/>;
    const {getByText} = render(comp);
    expect(getByText("Answers")).toBeInTheDocument();
});

/*it('renders each answer', () => {
    const comp = <Question getQuestion={_ => question}/>;
    const {getByText} = render(comp);
    question.answers.forEach(a => expect(getByText(a.votes)).toBeInTheDocument());
});*/

it('renders all answers for a Question', () => {
    const comp = <Question getQuestion={id => question}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(question.answers[0].text)).toBeInTheDocument();
    expect(getByText(question.answers[1].text)).toBeInTheDocument();
    expect(getByText(question.answers[2].text)).toBeInTheDocument();
});

/*
Did not get this to work yet

it('calls "onSubmit" when the voting button is clicked', () => {
    const onSubmit = jest.fn();
    const comp =
<Question
    getQuestion={id => question}
    onSubmit={onSubmit}
    />
    const {getAllByText} = render(comp);
    fireEvent.click(getAllByText(/Like/i)[0]);
    expect(onSubmit).toHaveBeenCalled();
});

*/