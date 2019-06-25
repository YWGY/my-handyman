const mongoose = require('mongoose');
const bcrypt = require('bcrypt');//加密方式

const schema = new mongoose.Schema({
    username :{
        type:String,
        trim:true,
        required:true
    },   
    password:{
        type:String,
        required:true
    },
   
});

schema.methods.hashPassword = async function() {
    this.password = await bcrypt.hash(this.password, 10);//异步函数
    console.log(this.password);
  };
  
  schema.methods.validatePassword = async function(password) {
    const validPassword = await bcrypt.compare(password, this.password);
    return validPassword;
  };
  
module.exports = mongoose.model('User', schema);
