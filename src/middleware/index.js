const jwt = require('jsonwebtoken');

const { key } = require('../config/config.json');

module.exports = (req, res, next) => {
  const { authorization } =  req.headers;

  if(!authorization)
    return res.json({ error: "token not provided" });

  const tokenSplited = authorization.split(' ');

  if(tokenSplited.length !== 2)
    return res.status(401).json({ error: "Token malformated" });

  var [ schema, token ] = tokenSplited;

  if(schema !== "Bearer")
    return res.status(401).json({ error: "Token malformated" });

  jwt.verify(token, key, (error, decoded) => {
    if(error)
      return res.status(401).send({ error: "Token not is valid" });

    req.user = decoded;

    next();
  })
}
