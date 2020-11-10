const User = require('../models/User');

module.exports = {
  async get(req, res){
    const user = req.decoded;

    const user = await User.findByPk(user.id);

    return res.json(user);
  }
}