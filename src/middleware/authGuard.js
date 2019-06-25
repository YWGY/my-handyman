const { validateToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json('Access denied');

  const contentArr = authHeader.split(' ');
  if (contentArr.length !== 2 || contentArr[0] !== 'Bearer')
    return res.status(401).json('Access denied');

  const decoded = validateToken(contentArr[1]);
  if (decoded) {
    req.user = decoded;//绑定user 获取解析出来的内容
    return next();
  }
  return res.status(401).json('Access denied');//decoded失败
};
