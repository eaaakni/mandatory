import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import AskQuestion from "./AskQuestion";
/*None of these wants to run through but the code should be something like this?*/
it('calls callback function when clicking on "Ask Question"', () => {
    // This is a mock callback function
    const onSubmit = jest.fn();

    // Render the NewRecipe component with the mock callback
    const {getByText} = render(<AskQuestion submit={onSubmit}/>);

    // Click on button 'Add recipe'
    fireEvent.click(getByText(/Ask Question/i));

    // Expect the callback to have been called
    expect(onSubmit).toHaveBeenCalled();
});

it('sends new title as the first parameter when clicking "Ask Question"', async () => {
    const onSubmit = jest.fn();
    const {getByLabelText, getByText} = render(<AskQuestion submit={onSubmit}/>);

    // Type the title into the form (simulating user typing)
    const title = "This is the title!";
    await userEvent.type(getByLabelText(/title/i), title);

    // Click on the "Add recipe" button
    fireEvent.click(getByText(/Ask Question/i));

    // The first arg of the first call to the function must be 'title'
    expect(onSubmit.mock.calls[0][0]).toBe(title);
});

it('sends question as the second parameter when clicking "Ask Question"', async () => {
    const onSubmit = jest.fn();
    const {getByLabelText, getByText} = render(<AskQuestion submit={onSubmit}/>);

    // Type question into the form
    const question = "What is going on";
    await userEvent.type(getByLabelText(/question/i), question);

    // Click on the "Add recipe" button
    fireEvent.click(getByText(/Ask Question/i));

    // The third arg of the first call to the function must be 'minutes'
    expect(onSubmit.mock.calls[0][1]).toBe(question);
});


