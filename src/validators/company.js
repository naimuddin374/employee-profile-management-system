const companyValidator = data => {
    let error = {}

    if (!data.name) {
        error.name = 'The name field is required!'
    }
    if (!data.email && !data._id) {
        error.email = 'The email field is required!'
    }
    if (!data.phone) {
        error.phone = 'The phone field is required!'
    }
    if (!data.address) {
        error.address = 'The address field is required!'
    }
    if (!data.password && !data._id) {
        error.password = 'The password field is required!'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}
module.exports = companyValidator