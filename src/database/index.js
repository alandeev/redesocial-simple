const { Sequelize } = require('sequelize');

const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const Image = require('../models/Image');

const config = require('../config/database');

const connection = new Sequelize(config);

User.init(connection);
Post.init(connection);
Like.init(connection);
Comment.init(connection);
Image.init(connection);

User.associate(connection.models);
Post.associate(connection.models);
Like.associate(connection.models)
Comment.associate(connection.models)
Image.associate(connection.models);
