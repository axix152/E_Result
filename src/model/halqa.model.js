const mongoose = require('mongoose')
const Schema = mongoose.Schema

const halqaSchema = new Schema({
    categoryName: {
        type: String,
        enum: ['NA', 'PP', 'PS', 'PK', 'PB'],
        required: true,
    },
    halqaNo: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    candidates: [{
        candidateName: {
            type: String,
            required: true,
        },
        partyName: {
            type: String,
            required: true,
        },
        vote: {
            type: Number,
            default: 0,
        },
    }],
});

const Halqa = mongoose.model('halqa',halqaSchema)

module.exports = Halqa