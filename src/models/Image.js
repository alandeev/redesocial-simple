const { Model, DataTypes } = require("sequelize");

class Image extends Model{
  static init(sequelize){
    super.init({
      filename: {
        type: DataTypes.STRING,
        unique: {
          msg: "filename must be unique"
        }
      },
      originalname: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      size: DataTypes.INTEGER,
    }, {
      sequelize
    });
  }
}

module.exports = Image;