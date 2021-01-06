// This is the original code from script.js before it was refactored

// Pull in DOM elements //
const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// Show input error message
function showError(input, message) {
    // we have to deal with the form-control div
    // This will set up the red border and error message
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    // This will change the text displayed to what we set up in showError
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check if email is valid
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// add an event listner on form when we submit it
// function will have an event paramater, which has several properties to use
form.addEventListener('submit', function(e) {
    // we want to intercept the submit content
    e.preventDefault();

    // This sets up the error message to display if the value is blank
    if(username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if(email.value === '') {
        showError(email, 'Email is required');
    } else if(!isValidEmail(email.value)) {
        showError(email, 'Email is not valid');
    } else {
        showSuccess(email);
    }

    if(password.value === '') {
        showError(password, 'Password is required');
    } else {
        showSuccess(password);
    }

    if(password2.value === '') {
        showError(password2, 'Password does not match');
    } else {
        showSuccess(password2);
    }
});