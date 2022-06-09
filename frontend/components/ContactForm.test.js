import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);

    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const testName = "None";

    const firstInput = screen.getByLabelText('First Name*');
        setInterval(()=> {
            userEvent.type(firstInput, testName);
        }, 1000)

    const errorFirst = await screen.findByText("Error: firstName must have at least 5 characters.")
    waitFor(() => expect(errorFirst).toBeInTheDocument());
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const error1 = screen.getByText("Error: firstName must have at least 5 characters.");
    const error2 = screen.getByText("Error: lastName is a required field.");
    const error3 = screen.getByText("Error: email must be a valid email address.");
    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
    expect(error3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = "tsriF";
    const lastName = 'tsaL';

    const firstInput = screen.getByLabelText("First Name*");
    const lastInput = screen.getByLabelText("Last Name*");
    userEvent.type(firstInput, firstName);
    userEvent.type(lastInput, lastName);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessage = screen.getByText("Error: email must be a valid email address.");
    expect(errorMessage).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const firstName = "Hinata";
    const lastName = "Shouto";
    const badEmail = "not@email";

    const firstInput = screen.getByLabelText("First Name*");
    const lastInput = screen.getByLabelText("Last Name*");
    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(firstInput, firstName);
    userEvent.type(lastInput, lastName);
    userEvent.type(emailInput, badEmail);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorEmail = screen.getByText("Error: email must be a valid email address.");
    expect(errorEmail).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstName = "Kageyama";
    const email = "setter@email.com";

    const firstInput = screen.getByLabelText("First Name*");
    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(firstInput, firstName);
    userEvent.type(emailInput, email);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessage = screen.getByText("Error: lastName is a required field.");
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = "Alexander";
    const lastName = "Hamilton";
    const email = "eyeofhurricane@email.com";

    const firstInput = screen.getByLabelText("First Name*");
    const lastInput = screen.getByLabelText("Last Name*");
    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(firstInput, firstName);
    userEvent.type(lastInput, lastName);
    userEvent.type(emailInput, email);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // use query by text when assuring something does NOT exist
    const message = screen.queryByText("Message:");
    expect(message).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = "Seungmin";
    const lastName = "Kim";
    const email = "email@email.com";
    const message = "hello world";

    const firstInput = screen.getByLabelText("First Name*");
    const lastInput = screen.getByLabelText("Last Name*");
    const emailInput = screen.getByLabelText("Email*");
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(firstInput, firstName);
    userEvent.type(lastInput, lastName);
    userEvent.type(emailInput, email);
    userEvent.type(messageInput, message);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const subFirst = await screen.findByText(firstName);
    const subLast = await screen.findByText(lastName);
    const subEmail = await screen.findByText(email);
    const subMessage = await screen.findByText(message);
    expect(subFirst).toBeInTheDocument();
    expect(subLast).toBeInTheDocument();
    expect(subEmail).toBeInTheDocument();
    expect(subMessage).toBeInTheDocument();
});
