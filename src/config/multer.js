const multer = require('multer');
const { resolve, extname } = require('path');

const fileAllowed = [
  'image/png',
  'image/jpg',
  'image/jpeg'
]

module.exports = {
  fileFilter: (req, file, cb) => {
    if(!fileAllowed.find(name => file.mimetype == name)){
      return cb(new multer.MulterError('File extension is not avaliable'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, resolve(__dirname, '..', 'public', 'assets', 'images'));
    },
    filename: function(req, file, cb){
      cb(null, `${Math.floor(Math.random() * 10000 + 10000)}${Date.now()}${extname(file.originalname)}`);      
    }
  })
}