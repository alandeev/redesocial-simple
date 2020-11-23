const { Model, DataTypes } = require("sequelize");

class Comment extends Model{
  static init(sequelize){
    super.init({
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}

module.exports = Comment;