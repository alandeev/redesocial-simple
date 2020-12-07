const multer = require('multer');

const multer_cfg = require('../config/multer');

const upload = multer(multer_cfg).single('file')

const Image = require('../models/Image');

class Upload {
  async store(req, res){
    return upload(req, res, async (err) => {
      if(err){ return res.status(400).json({ error: err.code }) }
      
      try{
        const { filename, originalname, size, mimetype } = req.file;
        const image = await Image.create({ filename, originalname, size, mimetype });
        
        return res.json(image);
      }catch(err){
        return res.status(400).json({ errors: [ err.message ] });
      }
    })
  }
}

module.exports = new Upload();