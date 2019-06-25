const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    customerName :{
        type:String,
        required:true
    },
    preferName: {
        type:String,
        default:''       
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }]
});

module.exports = mongoose.model('Customer', schema);

