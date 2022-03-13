const companyValidator = data => {
    let error = {}

    console.log('data', data)
    if (!data.name) {
        error.name = 'The name field is required!'
    }
    if (!data._id && !data.email) {
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