const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const Schema = mongoose.Schema
require('dotenv').config();


const articleSchema = mongoose.Schema({
    title:{
        type:String,
        maxLength:100,
        required:[true,'You need a title']
    },
    content:{
        type:String,
        required:[true,'You need a contact']
    },
    excerpt:{
        type:String,
        required:[true,'You need a excerpt'],
        maxLenght:500
    },
    score:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    actor:{
        type:[String],
        required:true,
        validate:{
            validator: function(array){
                return array.length >= 2
            },
            message:"You must add at least 2 actors"
        }
    },
    status:{
        type:String,
        required:true,
        enum: ['draft','public'],
        default:'draft',
        index:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

articleSchema.plugin(aggregatePaginate)

const Article = mongoose.model('Article', articleSchema)
module.exports = {Article}