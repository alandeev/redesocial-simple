const Post = require('../models/Post');
const User = require('../models/User');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
  
  module.exports = {
    async addComment(req, res){
      const { content } = req.body;
      const { id: user_id } = req.user;
      const { post_id } = req.params;

      const post = await Post.findOne({
        where: { id: post_id }
      })

      if(!post)
       return res.status(404).json({ error: "Postagem não encontrada." });

      if(!content || typeof(content) != "string" || content.length < 4){
        return res.status(400).json({ error: "conteúdo enviado incorretamente." });
      }

      try{
        const comment = await Comment.create({ content, user_id, post_id })
        res.json(comment);
      }catch(err){
        res.json({ error: err.message });
      }  
    }
  }