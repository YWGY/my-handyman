const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function loginUser(req, res) {
    const { username, password } = req.body;
  
    const existingUser = await User.findOne({ username })
    .exec();
    
    if (existingUser.password !== password) {
      return res.status(400).json('Invalid username or password');
    }
  
    const token = generateToken(existingUser._id);
    return res.json({ username, token }); 
  }
  
  module.exports = {
    loginUser
  };