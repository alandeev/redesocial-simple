const { Router } = require('express');

const middleware = require('../middleware');

const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');

const routes = Router();

routes.use(middleware);

routes.get('/', postController.get_all_posts);
routes.get('/filter', postController.get_all_posts_and_filter);
routes.post('/', postController.create_post);

//actions in the post!
routes.get('/:post_id/getlikes', likeController.get_likes_someone_post);
routes.get('/:post_id/like', likeController.add_like);
routes.get('/:post_id/unlike', likeController.rem_like);

routes.post('/:post_id/comment', commentController.addComment);

module.exports = routes;