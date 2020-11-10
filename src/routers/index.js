const { Router } = require('express');

const [ extensionAuth, authRoutes ] = require('./auth.routes');
const [ extensionClient, clientRoutes ] = require('./auth.routes');

const routes = Router();

//Auth's Routes 
routes.use(extensionAuth, authRoutes); //  ->  /

//Client's Routes 
routes.use(extensionClient, clientRoutes); //  ->  /user

module.exports = [ '/api', routes ];