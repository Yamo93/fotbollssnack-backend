const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts');
const { body } = require('express-validator');

/* GET /api/posts */
router.get('/', postsControllers.getPosts);

/* GET /api/posts/forums/:forumType */
router.get('/forums/:forumType', postsControllers.getPostsByLeague);

/* GET /api/posts/:id */
router.get('/:id', postsControllers.getPost);

/* POST /api/posts */
router.post('/', [
    body('text')
        .trim()
        .escape(),
    body('forumType')
        .trim()
        .escape()
], postsControllers.authorize, postsControllers.addPost);

/* DELETE /api/posts/:id */
router.delete('/:id', postsControllers.authorize, postsControllers.deletePost);

/* PUT /api/posts/:id */
router.put('/:id', [
    body('text')
        .trim()
        .escape(),
    body('forumType')
        .trim()
        .escape()
], postsControllers.authorize, postsControllers.updatePost);

module.exports = router;