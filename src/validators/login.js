const loginValidator = data => {
    let error = {}

    if (!data.email) {
        error.email = 'Email field is required!'
    }
    if (!data.password) {
        error.password = 'Password field is required!'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = loginValidator