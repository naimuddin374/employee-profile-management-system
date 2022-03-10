import dateFormat from 'dateformat'

export const dateTime = (date, type = 1) => {
    if (!date) return ''

    date = new Date(date)

    if (type === 1) {
        return dateFormat(date, "dd mmm yyyy");
    } else if (type === 2) {
        return dateFormat(date, "ddd, dd mmm yy");
    } else if (type === 3) {
        return dateFormat(date, "HH:MM");
    } else if (type === 4) {
        return dateFormat(date, "dd mmm yyyy HH:MM");
    }
    return date
}


export const textLimit = (text = '', limit = 30) => {
    if (!text) return null
    return text.length > limit ? `${text.substring(0, limit)} ...` : text
}
