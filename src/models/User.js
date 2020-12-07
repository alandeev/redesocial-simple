const { Model, DataTypes } = require('sequelize');

class User extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
      profile_id: DataTypes.INTEGER
    },
    {
      sequelize
    })
  }

  static associate(models){
    this.hasMany(models.Post, { foreignKey: 'owner', as: 'posts' });
    this.hasMany(models.Like, { foreignKey: 'user_id', as: 'likes' });
    this.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
    this.belongsTo(models.Image, { foreignKey: 'profile_id', as: 'profile' });
  }
}

module.exports = User;