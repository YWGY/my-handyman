const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
    customerName :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', 
        required:true       
    },
    businessName:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business',
        required:true 
    },
    // categroies:[{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Categroy',
    //     required:true 
    // }],
    status:{
        type:String,
        required:true,
        enum:['processing', 'accepted', 'finished'],
        default:'processing'
    },
    grade:{
        type:Number,        
        enum:[0, 1, 2, 3, 4, 5],
        default:5
    },
    Comment:{
        type:String,              
        default:''
    }
});

const model = mongoose.model('Order', schema);

module.exports = model;
