const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partySchema =  new Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    seats:{
        type:Number,
        default:0
    }
})


const categorySchema = new Schema({
    categoryName: {
        type: String,
        enum: ['NA', 'PP', 'PS', 'PK', 'PB'],
        required: true,
    },
    parties: [partySchema],
    totalSeats: {
        type: Number,
        required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
