const { Router } = require('express');

const authRoutes = require('./auth.routes');
const clientRoutes = require('./client.routes');
const postRoutes = require('./post.routes');

const routes = Router();

//Auth's Routes 
routes.use('/', authRoutes);

//Client's Routes (Need Access Client) 
routes.use('/user', clientRoutes);

//Post's Routes (Need access Client) 
routes.use('/user/posts', postRoutes);

module.exports = routes;