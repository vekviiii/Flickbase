const mongoose = require('mongoose');
require('dotenv').config();

const categoriesSchema = mongoose.Schema({
    name:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        maxlenght: 100,
        required: [true,'you need a category name']
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Category = mongoose.model('Category', categoriesSchema)
module.exports = { Category }