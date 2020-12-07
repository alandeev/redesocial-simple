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
      path: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      size: DataTypes.INTEGER,
    }, {
      sequelize
    });
  }

  static associate(models){
    this.hasOne(models.User, { foreignKey: 'profile_id', as: 'user' });
  }
}

module.exports = Image;