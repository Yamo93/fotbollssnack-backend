const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Du måste fylla i e-postadressen.";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "E-postadressen är ogiltig.";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Du måste fylla i lösenordet.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};