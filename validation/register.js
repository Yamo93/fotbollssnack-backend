const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.nickname = !isEmpty(data.nickname) ? data.nickname : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Du måste fylla i ditt namn.";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Du måste fylla i din e-postadress.";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "E-postadressen är ogiltig.";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Du måste fylla i lösenordet.";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Du måste bekräfta lösenordet.";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Lösenordet måste vara minst sex tecken långt och max 30 tecken.";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Lösenorden måste matcha.";
    }

    // Nickname checks
    if (Validator.isEmpty(data.nickname)) {
        errors.nickname = "Du måste fylla i ditt användarnamn.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};