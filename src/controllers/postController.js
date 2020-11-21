const Post = require('../models/Post');
const User = require('../models/User');
const ms = require('ms')

const convertTime = {
  'hour' : 'hora',
  'hours': 'horas',
  'minute': 'minuto',
  'minutes': 'minutos',
  'second': 'segundo',
  'seconds': 'segundos',
  'day': 'dia',
  'days': 'dias',
  'week': 'semana',
  'weeks': 'semanas',
  'mounth': 'mês',
  'mounths': 'meses',
  'year': 'ano',
  'years': 'anos'
}

module.exports = {
  async get_all_posts(req, res){
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ['id', 'name', 'photo']
      }
    });

    const new_array = posts.map(post => {
      const { id, user, content, createdAt } = post.dataValues;
      const date_now = new Date().getTime()
      const postedIn = ms(date_now-createdAt.getTime(), { long: true });
      const [ time, name ] = postedIn.split(' ');
      const name_converted = convertTime[name];

      return { id, user, content, createdAt: `${time} ${name_converted}` };
    })

    res.json(new_array.reverse());
  },
  async create_post(req, res){
    const { id: owner } = req.user;
    const { content } = req.body;

    if(typeof(content) !== "string" || content.length < 4)
      return res.status(400).json({ error: "Conteudo enviado incorretamente" });

    try{
      const post = await Post.create({ owner,content });
      return res.json(post);

    }catch(err){
      return res.status(400).send({ error: err.message });
    }
  }
}