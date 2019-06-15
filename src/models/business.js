const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    businessName :{
        type:String,
        required:true
    },
    ABN: {
        type:Number,  
        required:true,
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
    streeAddress:{
        type:String,
        required:true,
        default:''
    },
    postcode:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true,
        enum: ['NSW', 'VIC', 'QLD', 'WA', 'TAS','SA','ACT', 'NT'], 
    },
    categroies:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categroy'
    }],
    bookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }]
});

const model = mongoose.model('Business', schema);

module.exports = model;