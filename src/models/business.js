const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    businessName :{
        type:String,
        required:'Please enter your business name'
    },
    ABN: {
        type:Number,  
        required:'Please enter your ABN',
        default:''      
    },
    email:{
        type:String,
        required:'Please enter your email'
    },
    phone:{
        type:Number,
        required:'Please enter your phone'
    },
    streeAddress:{
        type:String,
        required:'Please enter your street address',
        default:''
    },
    postcode:{
        type:Number,
        required:'Please enter your postcode'
    },
    state:{
        type:String,
        required:'Please enter your state',
        enum: ['NSW', 'VIC', 'QLD', 'WA', 'TAS','SA','ACT', 'NT'], 
    },
    categroies:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categroy'
    }],
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }]
});

module.exports = mongoose.model('Business', schema);
