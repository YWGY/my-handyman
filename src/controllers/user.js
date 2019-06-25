const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function addUser(req, res) {
    const { username, password } = req.body;
  
    const existingUser = await User.findOne({ username }).exec();
    if (existingUser) {
      return res.status(400).json('User already exist');
    }
  
    const user = new User({
      username,
      password
    });
    await user.hashPassword();
    await user.save();//若不报错，则存储成功。若报错则表示用户功能出现问题
    const token = generateToken(user._id);
    return res.json({ username, token }); 
  }
  
  module.exports = {
    addUser
  };