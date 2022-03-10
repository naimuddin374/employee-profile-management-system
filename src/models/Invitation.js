const { Schema, model } = require('mongoose');

const InvitationSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number, //0=INACTIVE, 1=ACTIVE
        default: 1
    },
}, { timestamps: true })


module.exports = model('Invitation', InvitationSchema)