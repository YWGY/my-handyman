const jwt = require('jsonwebtoken');//签发和验证

function generateToken(id) //根据secret生成JWT token
{
  const token = jwt.sign(
    { id }, //payload
    process.env.JWT_KEY, //secret放在环境变量中
    {
    expiresIn: '1h'//限制的过期时间
  });
  return token;
}

function validateToken(token) 
{
  let decoded;//解码之后的内容
  try //用try catch，解码过程中可能报错
  {
    decoded = jwt.verify(token, process.env.JWT_KEY);//验证token，秘密是什么
  } catch (e) //验证失败走catch
  {
    return null;
  }
  return decoded; //验证成功，返回解码的内容
}

module.exports = { generateToken, validateToken };
