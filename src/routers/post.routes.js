const { Router } = require('express');

const middleware = require('../middleware');

const postController = require('../controllers/postController');

const routes = Router();

routes.use(middleware);

routes.get('/', postController.get_all_posts);
routes.post('/', postController.create_post);

module.exports = routes;