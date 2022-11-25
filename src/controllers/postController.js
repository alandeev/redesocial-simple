const Post = require('../models/Post');
const User = require('../models/User');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const ms = require('ms')

const filtersPost = {
  "searchkey": (posts, key) => posts.filter(post => post.content.match(new RegExp(key, 'ig')) || post.user.name.match(new RegExp(key, 'ig')))
}

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
  async delete_post_by_id(req, res) {
    const { post_id } = req.params;

    const post = await Post.findOne({
      where: {
        id: post_id,
        owner: req.user.id
      }
    })

    if(!post) {
      return res.status(400).send({ 
        error: "Você não tem permissão para deletar" 
      });
    }

    await post.destroy()

    res.status(200).send({
      message: "Post deletado com sucesso"
    })

  },
  async get_all_posts_and_filter(req, res){
    const { type, key } = req.query;
    if(!type || !key || key.length == 0)
      return res.status(400).send({ error: "Você enviou a 'query' ou a 'key' incorreamente."});

    const findFilter = filtersPost[type];
    if(!findFilter)
      return res.status(400).send({ error: "Tipo de filtro não encontrado" });

    const posts = (await Post.findAll({
      include: [{
        model: User,
        as: "user",
        attributes: ['id', 'name', 'photo']
      },{
        model: Like,
        as: "likes",
        attributes: ['id', 'post_id', 'user_id']
      },{
        model: Comment,
        as: "comments",
        attributes: ['user_id', 'post_id', 'content']
      }]
    })).sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

    const new_array = posts.map(post => {
      const { id, user, content, createdAt, likes, comments } = post.dataValues;
      const date_now = new Date().getTime()
      const postedIn = ms(date_now-createdAt.getTime(), { long: true });
      const [ time, name ] = postedIn.split(' ');
      const name_converted = convertTime[name];
      const createdtoSend =  name_converted ? `${time} ${name_converted}` : 'Agora';

      return { id, user, content, createdAt: createdtoSend, likes, comments };
    }).reverse()

    res.json(findFilter(new_array, key));
  },
  async get_all_posts(req, res){
    const posts = (await Post.findAll({
      include: [{
        model: User,
        as: "user",
        attributes: ['id', 'name', 'photo']
      },{
        model: Like,
        as: "likes",
        attributes: ['id', 'post_id', 'user_id']
      },{
        model: Comment,
        as: "comments",
        attributes: ['user_id', 'post_id', 'content']
      }]
    })).sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

    const new_array = posts.map(post => {
      const { id, user, content, createdAt, likes, comments } = post.dataValues;
      const date_now = new Date().getTime()
      const postedIn = ms(date_now-createdAt.getTime(), { long: true });
      const [ time, name ] = postedIn.split(' ');
      const name_converted = convertTime[name];
      const createdtoSend =  name_converted ? `${time} ${name_converted}` : ' agora';

      return { id, user, content, createdAt: createdtoSend, likes, comments };
    }).reverse()

    res.json(new_array);
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
  },
  async getPostById(req, res){
    const { post_id } = req.params;

    const post = (await Post.findOne({
      where: { id: post_id },
      include: [{
        association: 'comments',
        attributes: ["id", "content", "createdAt"],
        include: {
          association: 'owner',
          attributes: ["id", "name", "photo"]
        }
      },{
        association: 'user',
        attributes: ["id", "name", "photo"]
      },{
        association: 'likes',
        attributes: ["user_id"]
      }]
    })).toJSON();

    let createdAt = ms(new Date().getTime()-post.createdAt.getTime(), { long: true });
    post.createdAt = createdAt;

    if(post.comments.length > 0){
      post.comments.forEach((comment, index) => {
        let createdAt = ms(new Date().getTime()-comment.createdAt.getTime(), { long: true });
        post.comments[index].createdAt = createdAt;
      });
    }

    res.json(post);
  }
}