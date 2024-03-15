// For the title
const title = document.querySelector('#title');
// For reg form
const regForm = document.querySelector('.regForm');

// For reg form fields
const usernameReg = document.getElementById('usernameReg');
const passwordReg = document.getElementById('passwordReg');

// For login form
const logForm = document.querySelector('.logForm');

// For login form fields
const username = document.getElementById('username');
const password = document.getElementById('password');

// For username and passwords
const usernameAndPasswords = {}

// For getting the date and time today
const time = new Date().toLocaleString();

// For checking if a username already exists
function checkIfUserExists(username, usernameAndPasswords) {
	if (usernameAndPasswords.hasOwnProperty(username)) {
		return true
	}
}

// For validating username and passwords stored 
function validateUserNameAndPassword(username, password, usernameAndPasswords,) {
	if(usernameAndPasswords.hasOwnProperty(username) && usernameAndPasswords[username] == password) {
		return true;
	}
}

regForm.addEventListener('submit', function (e) {
	e.preventDefault();

	// Validate if one of the fields are empty
	if(usernameReg.value.length === 0 || passwordReg.value.length === 0) {
		alert("Fill out all the forms first");
	} else {

		// Password validation
		const password = passwordReg.value;

		// Check if the password is less than 8 characters
		if (password.length < 8) {
			alert("Password should be at least 8 characters long");
			return;
		}

		// Check if the password only consists of integers
		if (/^\d+$/.test(password)) {
			alert("Password should contain at least one non-numeric character");
			return;
		}

		// Check if the password is not a combination of uppercase and lowercase characters
		if (!(password.match(/[a-z]/) && password.match(/[A-Z]/))) {
			alert("Password should contain at least one uppercase and one lowercase character");
			return;
		}

		// Check if the username is already taken
		if (checkIfUserExists(usernameReg.value, usernameAndPasswords)) {
			alert('Username is already taken');
		} else {
			// Store the username and passwords inside the JavaScript Object 
			usernameAndPasswords[usernameReg.value] = passwordReg.value;
			console.log(usernameAndPasswords);

			// Display the login form and get rid of the registration form on the page
			logForm.style.display = "block";
			regForm.style.display = "none";
		}
	}
})

logForm.addEventListener('submit', function (e) {

	// Passing username and password to the function
	if (validateUserNameAndPassword(username.value, password.value, usernameAndPasswords)) {

		// Hide the login form and title after user has been validated
		logForm.style.display = "none";
		title.style.display = "none";

		// Greet user who just logged in
		document.querySelector('.welcomePanel #greeting').innerHTML = "Good day! " + username.value + ". It's currently " + time;
	}
	else {

		// Login invalid
		alert("Username and password don't exist");

	}

})

// Event listener for password input field
passwordReg.addEventListener('input', function () {
    const password = passwordReg.value;

    // Check password length
    const isLengthValid = password.length >= 8;

    // Check if password consists of only integers
    const containsNonNumeric = /\D/.test(password);

    // Check if password contains a combination of uppercase and lowercase characters
    const containsUpperCase = /[A-Z]/.test(password);
    const containsLowerCase = /[a-z]/.test(password);
    const isCaseValid = containsUpperCase && containsLowerCase;

    // Change color based on validation
    if (isLengthValid && !containsNonNumeric && isCaseValid) {
        passwordReg.style.borderColor = 'green';
    } else {
        passwordReg.style.borderColor = 'red';
    }
});
