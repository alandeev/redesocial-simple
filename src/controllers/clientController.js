const User = require('../models/User');

module.exports = {
  index(req, res){
    const { name, id } = req.user;
    return res.send({ name, id });
  },
}