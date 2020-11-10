const { Sequelize } = require('sequelize');

const User = require('../models/User');

const config = require('../config/database');

const connection = new Sequelize(config);

User.init(connection);