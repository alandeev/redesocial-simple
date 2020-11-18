const { Sequelize } = require('sequelize');

const User = require('../models/User');
const Post = require('../models/Post');

const config = require('../config/database');

const connection = new Sequelize(config);

User.init(connection);
Post.init(connection);

User.associate(connection.models);
Post.associate(connection.models);
