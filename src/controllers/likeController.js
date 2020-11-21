const User = require('../models/User')
const Post = require('../models/Post')
const Like = require('../models/Like')

module.exports = {
  async get_likes_someone_post(req, res){
    const { post_id } = req.params;
    const likes = await Like.findAll({
      // where: { post_id }
      include: {
        model: Post,
        as: "post"
      }
    });
    
    return res.json(likes);
  },
  async add_like(req, res){
    const { id } = req.user;
    const { post_id } = req.params;

    const postExists = await Post.findOne({
      where: { id: post_id },
      include: {
        model: Like,
        as: 'likes'
      }
    });

    if(!postExists)
      return res.status(404).json({ error: "Post não existe." });
    
  
    if(postExists.likes.find(like => like.user_id == id))
     return res.status(404).json({ error: "Você já curtiu esse post" });

    try{
      const created = await Like.create({
        user_id: id,
        post_id,
      })

      res.send({id, post_id, created});
    }catch(err){
      return res.json({ error: err.message })
    }
  },
  async rem_like(req, res){
    const { id } = req.user;
    const { post_id } = req.params;

    const liked = await Like.findOne({
      where: { user_id: id, post_id }
    })

    if(!liked){
      return res.status(400).json({ error: "Você não deu like ou post não existe." })
    }

    try{
      await liked.destroy();
      res.json({ success: "Unliked with success!" })
    }catch(err){
      return res.json({ error: err.message })
    }
  }
}