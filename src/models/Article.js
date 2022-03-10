const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    image: String,
    publisherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    publishDate: {
        type: Date,
        trim: true,
        required: true
    },
    status: {
        type: Number, //0=INACTIVE, 1=ACTIVE
        default: 1
    },
}, { timestamps: true })


module.exports = model('Article', ArticleSchema)