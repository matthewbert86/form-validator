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
function checkEmail(input) {
    // source - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
function checkRequired(inputArr) {
    // High order array method can attatch to an array 
    // The forEach will loop through the array
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            // pass in whatever the input is and display error message
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check that passwords patch
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value ) {
        showError(input2, 'Passwords do not match!');
    }
}

// Get fieldname
function getFieldName(input) {
    // charAt() lets us select the spot we want to add a character
    // slice(1) removes the original undercase letter
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters.`);
    } else {
        showSuccess(input);
    }
}


// add an event listner on form when we submit it
// function will have an event paramater, which has several properties to use
form.addEventListener('submit', function(e) {
    // we want to intercept the submit content
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});