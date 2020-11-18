const { Model, DataTypes } = require("sequelize");

class Post extends Model{
  static init(sequelize){
    super.init({
      owner: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING
    }, {
      sequelize
    });
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'owner', as: 'user' });
  }
}

module.exports = Post;