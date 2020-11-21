const { Model, DataTypes } = require("sequelize");

class Post extends Model{
  static init(sequelize){
    super.init({
      owner: DataTypes.INTEGER,
      content: DataTypes.STRING
    }, {
      sequelize
    });
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'owner', as: 'user' });
    this.hasMany(models.Like, { foreignKey: 'post_id', as: 'likes' });
  }
}

module.exports = Post;