require('dotenv').config()
const express = require('express')
const router = express.Router()

// Auth Controller
const {
  registration,
  login,
  checkAuth
} = require('../controllers/auth')

// User Controller
const {
  getUsers, updateUser,
  deleteUser, getFollowers,
  getFollowing,
} = require('../controllers/user')

// Feed Controller
const {
  createFeed,
  getFeeds,
  getFollowedFeeds,
  addLike,
  getComments,
  addComment
} = require('../controllers/feed')

// Messages Controller
const {
  addMessage,
  getMessages
} = require('../controllers/message')

const { auth } = require('../middleware/auth')

// Auth Endpoint
router.post('/register', registration)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

// User Endpoint
router.get('/users', getUsers)
router.patch('/user/:id', auth, updateUser)
router.put('/user/:id', auth, updateUser)
router.delete('/user/:id', deleteUser)
router.get('/followers/:id', getFollowers)
router.get('/following/:id', getFollowing)

// Feed Endpoint
router.post('/feed', auth, createFeed)
router.get('/feeds', getFeeds)
router.post('/like', auth, addLike)
router.get('/feed/:id', getFollowedFeeds)
router.get('/comments/:id', auth, getComments)
router.post('/comment', auth, addComment)

// Messages Endpoint
router.post('/message/:id', auth, addMessage)
router.get('/message-user/:id', auth, getMessages)

module.exports = router
