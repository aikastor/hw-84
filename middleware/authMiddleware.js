const Users = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');

  if(!authorizationHeader) {
    return res.status(401).send({error: 'No Token!'});
  }
  const [type, token] = authorizationHeader.split(' ');

  if(type !== 'Token' || !token) {
    return res.status(401).send({error: 'Auth type wrong, no token present!'})
  }
  const user = await Users.findOne({token});

  if(!user) {
    return  res.status(401).send({error: 'Incorrect token!'});
  }
  req.user = user;
  next();
};

module.exports = authMiddleware;

