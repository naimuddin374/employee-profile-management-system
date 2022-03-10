const registerValidator = data => {
    let error = {}

    if (!data.token) {
        error.token = 'Token field is required!'
    }
    if (!data.name) {
        error.name = 'Name field is required!'
    }
    if (!data.contact) {
        error.contact = 'Phone number field is required!'
    }
    if (!data.email) {
        error.email = 'Email field is required!'
    }
    if (!data._id && !data.password) {
        error.password = 'Password field is required!'
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = registerValidator