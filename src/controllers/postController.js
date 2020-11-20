const Post = require('../models/Post');
const User = require('../models/User');
const ms = require('ms')

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
      console.log({id, user, content, createdAt});
      const date_now = new Date().getTime()
      const postedIn = ms(date_now-createdAt.getTime(), { long: true });
      return { id, user, content, createdAt: postedIn };
    })
    // console.log(new_array);
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