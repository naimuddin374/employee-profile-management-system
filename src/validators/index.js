const validator = (data, fields) => {
    let error = {}

    fields.forEach(field => {
        if (Object.keys(data).includes(field)) {
            if (!data[field]) {
                error[field] = `The ${field} field is required!`
            }
        }
    })

    return {
        isValid: Object.keys(error).length === 0 ? true : false,
        error
    }
}
module.exports = validator
