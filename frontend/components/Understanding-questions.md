`renders without errors` :
    will render(<ContactForm />)
    and that is it, if it does not render correctly we will get an error.

`renders the contact form header` :
    the contact form header is text within an h1 tag
    so: 
    arrange: 
        render();
    act: get element searching for
        const header = screen.getByText(/contact form/i);
    assert: element is on page
        expect(header).toBeInTheDocument();

`renders ONE error message if user enters less then 5 characters into firstname.` :
    arrange: 
        render();
        set testname to name with less than 5 characters

    act:
        grab textInput for first name
        type testName into input

    assert: 
        expect there to be error saying "Error: firstName must have at least 5 characters."

`renders THREE error messages if user enters no values into any fields.` :
    Arrange: 
        render();

    Act:
        const submitButton
        click submitButton

    Assert:
        const error1
        const error2
        const error3
        expect each errors to be in the document

`renders ONE error message if user enters a valid first name and last name but no email.` :
    Arrange: 
        render();
        const firstName
        const lastName

    Act
        const firstInput
        const lastInput
        types names into inputs
        const submit
        click submit

    Assert
        expect const email error to exist

`renders "email must be a valid email address" if an invalid email is entered` :
    Arrange: 
        render();
        const firstName
        const lastName
        const badEmail

    Act:
        const firstInput
        const lastInput
        const emailInput
        type first, last, bademail into inputs
        const submit
        click submit

    Assert:
        const errorMessage
        expect error Message to exist

`renders "lastName is a required field" if an last name is not entered and the submit button is clicked` :
    Arrange:
        render();
        const first
        const email

    Act:
        first input
        email input
        submit button
        submit clicked

    Assert:
        error message
        exists

`renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.` :
    Arrange: 
        render();
        const first
        const last
        const email

    Act:
        const firstInput
        const lastInput
        const emailInput
        type
        const submit
        click submit

    Assert:
        const message
        does not exist

`renders all fields text when all fields are submitted.` :
    Arrange: 
        render();
        const first
        const last
        const email
        const message

    Act:
        const firstInput
        const lastInput 
        const emailInput 
        const messageInput 
        type
        const submit
        click submit

    Assert:
        const find all inserted fiels
        expect to be in document()
