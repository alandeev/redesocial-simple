const { Sequelize } = require('sequelize');

const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');

const config = require('../config/database');

const connection = new Sequelize(config);

User.init(connection);
Post.init(connection);
Like.init(connection);

User.associate(connection.models);
Post.associate(connection.models);
Like.associate(connection.models)
