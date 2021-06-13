require('dotenv').config()
const express = require('express')
const router = express.Router()

const {
  getUsers, updateUser,
  deleteUser, getFollowers,
  getFollowing,
} = require('../controllers/user')

const { auth } = require('../middleware/auth')

// User Endpoint
router.get('/users', getUsers)
router.patch('/user/:id', auth, updateUser)
router.put('/user/:id', auth, updateUser)
router.delete('/user/:id', deleteUser)
router.get('/followers/:id', getFollowers)
router.get('/following/:id', getFollowing)

module.exports = router
