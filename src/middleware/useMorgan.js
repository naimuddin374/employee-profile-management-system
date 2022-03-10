const config = require('config')
const morgan = require('morgan')
const rfs = require("rotating-file-stream");
const path = require('path');


module.exports = function (app) {
    const format = config.env === 'production' ? 'combined' : 'dev';


    // WRITE STREAM FILE LOG DEPEND ON NODE ENV
    const accessLogStream200 = rfs.createStream('access200.log', {
        path: path.join(__dirname, '../../', 'logs'),
        interval: '1d',
        size: '15MB'
    })

    const accessLogStream400 = rfs.createStream('access400.log', {
        path: path.join(__dirname, '../../', 'logs'),
        interval: '1d',
        size: '15MB'
    })


    // STATUS CODE 400 & 500
    app.use(
        morgan(format, {
            skip: (req, res) => res.statusCode < 400,
            stream: config.env === 'production' ? accessLogStream400 : process.stderr,
        })
    );


    // STATUS CODE 200 & 300
    app.use(
        morgan(format, {
            skip: (req, res) => res.statusCode >= 400,
            stream: config.env === 'production' ? accessLogStream200 : process.stdout,
        })
    );
};