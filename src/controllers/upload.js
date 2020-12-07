const multer = require('multer');

const { unlink } = require('fs');

const multer_cfg = require('../config/multer');

const upload = multer(multer_cfg).single('file')

const Image = require('../models/Image');
const User = require('../models/User');

class Upload {
  async index(req, res){
    const images = await Image.findAll({
      include: {
        association: 'user'
      }
    });

    return res.json(images);
  }

  async store(req, res){
    return upload(req, res, async (err) => {
      if(err){ return res.status(400).json({ error: err.code }) }

      try{
        const image = await Image.create(req.file, { 
          fields: [ 'filename', 'originalname', 'size', 'mimetype', 'path' ]
        });
        
        const user = await User.findByPk(req.user.id, {
          include: 'profile'
        });

        if(!user) return res.status(400).json({ errors: ['user not found'] });
        
        if(user.profile) {
          user.profile.destroy();
          unlink(user.profile.path, () => {});
        }

        //setting profile image;
        await user.update({ profile_id: image.id });

        return res.status(200).json();
      }catch(err){
        return res.status(400).json({ errors: [ err.message ] });
      }
    })
  }
}

module.exports = new Upload();