const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
 if(!req.headers.authorization) {
  return res.status(401).json({ message: 'Unauthorized' });
 }
  let token = req.headers.authorization && req.headers.authorization.split('.')[1];
  token = token.split("\\.");
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }
  try {
    const decodedPayload = Buffer.from(token[0], 'base64').toString('utf-8');
    const valuesNode = JSON.parse(decodedPayload);
    req.user = {
      organizations: valuesNode.organizations,
      name: valuesNode.name,
      email: valuesNode.email,
      userId: valuesNode.sub
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}
