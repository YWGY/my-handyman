const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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

module.exports = mongoose.model('Category', schema);
