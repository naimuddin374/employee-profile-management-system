const fs = require("fs")
const logger = require("./logger")


exports.actionSuccess = (res, message = 'Success', data = null) => {
    res.status(200).json({
        message,
        data,
    })
}


exports.createdSuccess = (res, message = 'Created Successful!', data = null) => {
    res.status(201).json({
        message,
        data,
    })
}


exports.updatedSuccess = (res, data = null, message = 'Update Successful!') => {
    res.status(201).json({
        message,
        data,
    })
}


exports.badRequest = (res, error, message = "Bad Request!") => {
    logger.error(error)
    res.status(400).json({
        message,
        error
    })
}

exports.validationError = (res, error) => {
    logger.warn(error)
    res.status(406).json({
        message: 'Validation Error!',
        error
    })
}


exports.serverError = (res, error) => {
    logger.error(error)
    res.status(500).json({
        message: 'Server Error Occurred!',
        error
    })
}

exports.makeRand = length => {
    var result = '';
    var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


exports.filterText = text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


exports.dateFormatter = date => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


function changeTimezone(date) {
    var invDate = new Date(date.toLocaleString('en-US', { timeZone: "Asia/Dhaka" }));
    var diff = date.getTime() - invDate.getTime();
    return new Date(date.getTime() - diff);
}


exports.getToDate = (today = new Date()) => {
    var toDate = changeTimezone(today, "Asia/Dhaka");
    return this.dateFormatter(toDate)
}


exports.getNowTime = () => {
    let today = new Date()
    let hours = today.getHours()
    if (Number(hours) < 10) {
        hours = '0' + hours
    }

    let minutes = today.getMinutes()
    if (Number(minutes) < 10) {
        minutes = '0' + minutes
    }

    let nowTime = hours + ':' + minutes
    // nowTime = '00:00'

    return nowTime;
}



exports.uniqueCode = (num) => {
    let date = new Date();
    let year = date.getFullYear();
    year = year.toString().slice(2)
    let month = date.getMonth() + 1
    if (month < 10) {
        month = "0" + month
    }
    let day = String(date.getDate()).padStart(2, '0');
    let uniqueCode = year + month + day + (num + 1)
    return uniqueCode;
}


exports.toTitleCase = (str) => {
    if (!str) return ''

    str = str.toLowerCase()
    return str.replace(/[^-'\s]+/g, function (word) {
        return word.replace(/^./, function (first) {
            return first.toUpperCase();
        });
    });
}