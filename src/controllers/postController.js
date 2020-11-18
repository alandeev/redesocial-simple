const Post = require('../models/Post');

module.exports = {
  async get_all_posts(req, res){
    const posts = await Post.findAll();
    res.json(posts);
  },
  async create_post(req, res){
    const { id: owner } = req.user;
    const { title, content } = req.body;

    if(typeof(title) !== "string" || title.length < 4)
      return res.status(400).json({ error: "Titulo enviado incorretamente" });

    if(typeof(content) !== "string" || content.length < 4)
      return res.status(400).json({ error: "Conteudo enviado incorretamente" });

    try{
      const post = await Post.create({ owner, title, content });
      return res.json(post);

    }catch(err){
      return res.status(400).send({ error: err.message });
    }
  }
}