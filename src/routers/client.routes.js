const { Router } = require('express');

const middleware = require('../middleware');

const clientController = require('../controllers/clientController');
const uploadController = require('../controllers/upload');

const routes = Router();

routes.use(middleware);

routes.get('/', clientController.index);
routes.get('/all', clientController.getAll);
routes.post('/setphoto', clientController.setPhotoProfile);
routes.post('/setphoto_teste', uploadController.store);

module.exports = routes;