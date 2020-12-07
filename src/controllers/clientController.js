const User = require('../models/User');

const filters = [{
    name: "lastuserscreated",
    exec: (users) => users.slice(0, 5)
  }, {
    name: "topposts",
    exec: (users) => users.filter(post => post) //exemplo de json que filtra
  }
]

module.exports = {
  async index(req, res){
    const findOneUserById = await User.findByPk(req.user.id);
   
    if(!findOneUserById)
      return res.json({ error: "Usuario não encontrado" });
    
    findOneUserById.password = undefined;
    return res.send(findOneUserById);
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
  },

  //characters | / 

  async setPhotoProfile(req, res){
    const { id } = req.user;
    const { url } = req.body;

    const validators = /\.(jpe?g|png|gif|webp)$/gi

    if(!url || url.length < 10 || !validators.test(url) || !url.includes('http')){
      return res.status(400).send({ error: "Url de foto invalida" });
    }

    const user = await User.findByPk(id);
    if(!user)
     return res.status(404).json({ error: "Usuario não encontrado" });

    user.photo = url;
    await user.save();

    return res.json({ success: "Foto de perfil alterada com sucesso!" });
  }
}