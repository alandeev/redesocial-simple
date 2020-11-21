const User = require('../models/User');

const filters = [{
    name: "lastuserscreated",
    exec: (users) => users.slice(0, 10)
  }, {
    name: "topposts",
    exec: (users) => users.filter(post => post) //exemplo de json que filtra
  }
]


module.exports = {
  index(req, res){
    const { name, id } = req.user;
    return res.send({ name, id });
  },
  
  async getAll(req, res){
    const { filter } = req.query;
    const { exec } = filters.find(f => f.name == filter);
    if(!exec) return res.status(400).json({ error: "Filtro não encontrado!" });

    const users = (await User.findAll({
      attributes: [ "id", "name", "createdAt", "photo" ]
    })).reverse()
    if(users.length == 0) return res.json({ error: "don't have users" });

    const users_filted = exec(users);
    res.json(users_filted);
  }
}