const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  async get_all_posts(req, res){
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ['id', 'name', 'photo']
      }
    });
    res.json(posts.reverse());
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