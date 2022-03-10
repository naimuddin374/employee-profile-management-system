const articleValidator = data => {
    let error = {}

    if (!data.title) {
        error.title = 'Title field is required!'
    }
    if (!data.description) {
        error.description = 'The description field is required!'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}
module.exports = articleValidator