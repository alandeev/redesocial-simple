const jwt = require('jsonwebtoken');
const { key } = require('../config/config.json');

const User = require('../models/User');

module.exports = {
  async authenticate(req, res){
    const { email, password } = req.body;

    if(!email || typeof(email) !== "string"){
      return res.status(401).json({ error: "Email não enviado ou tipo invalido" });
    }

    if(!password || typeof(password) !== "string"){
      return res.status(401).json({ error: "Senha não enviada ou tipo invalido" });
    }
  
    const findUserSameEmail = await User.findOne({
      where: { email }
    });

    if(!findUserSameEmail){
      return res.status(401).send({ error: "Email não existente", type: "email" });
    }
      
    if(findUserSameEmail.password !== password){
      return res.status(401).send({ error: "Senha invalida", type: "password" });
    }

    const { id, name } = findUserSameEmail;

    const token = jwt.sign({
      id, name
    }, key, { expiresIn: '1d' });
  
    return res.json({ token: `Bearer ${token}`, name });
  },
  async register(req, res){
    const { name, email, password } = req.body;

    if(!email || typeof(email) !== "string"){
      return res.status(401).json({ error: "Email não enviado ou tipo invalido" });
    }

    if(!password || typeof(password) !== "string"){
      return res.status(401).json({ error: "Senha não enviada ou tipo invalido" });
    }

    if(!name || typeof(name) !== "string"){
      return res.status(401).json({ error: "Nome não enviado ou tipo invalido" });
    }

    const findUserSameEmail = await User.findOne({
      where: { email }
    });

    if(findUserSameEmail){
      return res.status(401).send({ error: "Este E-mail já está cadastrado.", type: "email" });
    }

    try{
      const user = await User.create({ name, email, password });

      return res.json(user);
    }catch(err){
      return res.json({ error: err.message });
    }
  }
}