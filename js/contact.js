(function () {
    // Save css selectors
    let form = document.querySelector('#register-form');
    let emailInput = document.querySelector("#email");
    let phoneInput = document.querySelector("#phone");

    // save entry patterns - '^' and '$' match the start and end
    const phoneRegexPattern = /^\d{3}-\d{3}-\d{4}$/;
    // '[\w\W]+' matches one or more of either word or non-word characters. 
    //Has a number of character limit of 64 for the local part of the entry email.
    const emailRegexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //parameters are input(DOM element) and a message
    function showErrorMessage(input, message) {
        let container = input.parentElement; //The .form-group
        //Check and remove any existing errors.
        let error = container.querySelector(".error-message");
        if (error) {
            container.removeChild(error);
        }

        //Add the error if the message isn't empty.
        if (message) {
            let error = document.createElement("div");
            error.classList.add("error-message");
            error.innerText = message;
            container.appendChild(error);
        }
    }

    function validateEmail() {
        let emailValue = emailInput.value;

        // ! sign infront of value is called bang operator.
        // if value is NOT true
        // execute the following code 
        if (!emailValue) {
            showErrorMessage(emailInput, "Email is a required field.");
            return false;
        }

        //emailRegexPattern declared globally
        if (!emailRegexPattern.test(emailValue)) {
            showErrorMessage(emailInput, 'Please enter a valid email address. (e.g. john.doe@example.com');
            return false;
        }

        showErrorMessage(emailInput, null);
        return true;
    }

    function validatePhoneNumber() {
        let phoneValue = phoneInput.value;

        if (!phoneValue) {
            showErrorMessage(phoneInput, "Phone number is a required field.");
            return false;
        }

        //emailRegexPattern declared globally
        if (!phoneRegexPattern.test(phoneValue)) {
            showErrorMessage(phoneInput, 'Please enter a valid phone number. (e.g. 123-456-7890');
            return false;
        }

        showErrorMessage(phoneInput, null);
        return true;
    }

    function validateForm() {
        let isValidEmail = validateEmail();
        let isValidePhoneNumber = validatePhoneNumber();
        return isValidEmail && isValidePhoneNumber;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // do not submit to the server.
        if (validateForm()) {
            alert("Thank you.");
        }
    })
    emailInput.addEventListener("input", validateEmail);
    console.log("ValidateEmail event");
    phoneInput.addEventListener("input", validatePhoneNumber);
    console.log("ValidatePhoneNumber event")
})();