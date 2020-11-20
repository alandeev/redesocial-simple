const { Router } = require('express');

const middleware = require('../middleware');

const clientController = require('../controllers/clientController');

const routes = Router();

routes.use(middleware);

routes.get('/', clientController.index);
routes.get('/all', clientController.getAll);

module.exports = routes;