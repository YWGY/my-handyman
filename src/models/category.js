const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const category = new mongoose.Schema({
    name :{
        type:String,
        required:true,        
    },
    description: {
        type:String,       
        default:''
    },
    businesses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
    }]
});

const model = mongoose.model('Category', schema);

module.exports = model;