const express = require('express')
const router = express.Router()
const passport = require('passport')
const postController = require('../controllers/postController')
const userController = require('../controllers/userController')

router.route('/users')
.get(userController.getUsers)

router.route('/user/signup')
.post(userController.signUp)

router.route('/user/signin')
.post(userController.signIn)

router.route('/following/:id')
.post(userController.addFollowing)


router.route('/followers/:id')
.post(userController.addFollowers)
.put()

router.route('/posts')
.get(postController.getPosts)
.post(postController.createPost)

router.route('/post/:_id')
.delete(postController.deletePost)



router.route('/like/:id')
.post(postController.addLike)

router.route('/comment')
.post(postController.addComment)
.put(postController.delComment)

module.exports = router