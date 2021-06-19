const {
  user: User,
  feed: Feed,
  comment: Comment,
  follower: Follower,
  like: Like
} = require('../../models')

const joi = require('joi')
const sequelize = require('sequelize')

exports.createFeed = async (req, res) => {
  try {
    const { body } = req
    const { idUser } = req.authData

    const schema = joi.object({
      image: joi.string().min(5).required(),
      caption: joi.required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const createFeed = await Feed.create({
      userId: idUser,
      fileName: body.image,
      caption: body.caption,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const newFeed = await Feed.findOne({
      where: { id: createFeed.id },
      include: {
        model: User,
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['userId', 'like', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      data: {
        feed: newFeed
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getFollowedFeeds = async (req, res) => {
  try {
    const followerId = +req.params.id

    if (!followerId) {
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter required!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id: followerId }
    })

    if (!userIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `User with ID: ${followerId} is Not Found`
      })
    }

    const feeds = await Feed.findAll({
      include: [
        {
          model: Like,
          attributes: []
        },
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: {
            model: Follower,
            as: 'followed_users',
            where: { followerId },
            attributes: []
          },
          attributes: {
            exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
          }
        }],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('likes.id')), 'like'],
        ],
        exclude: ['userId', 'createdAt', 'updatedAt']
      },
      group: 'id'
    })

    res.send({
      status: 'success',
      data: {
        feeds
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getFeeds = async (req, res) => {
  try {
    const feeds = await Feed.findAll({
      include: [
        {
          model: Like,
          attributes: []
        },
        {
          model: User,
          attributes: {
            exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
          }
        }
      ],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('likes.id')), 'like'],
        ],
        exclude: ['userId', 'createdAt', 'updatedAt']
      },
      group: 'id'
    })

    res.send({
      status: 'success',
      data: {
        feeds
      }
    })

  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.addLike = async (req, res) => {
  try {
    const feedId = +req.body.id
    const { idUser: userId } = req.authData

    if (!feedId) {
      return res.status(400).send({
        status: 'failed',
        message: 'Feed ID required!'
      })
    }

    const feedIsExists = await Feed.findOne({
      where: { id: feedId }
    })

    if (!feedIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `Feed with ID: ${feedId} is Not Found`
      })
    }

    const isLiked = await Like.findOne({
      where: {
        userId,
        feedId
      }
    })

    if (!isLiked) {
      const addLike = await Like.create({
        userId,
        feedId,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      return res.send({
        status: 'success',
        message: 'Feed is Liked',
        data: {
          feed: {
            id: addLike.feedId
          }
        }
      })
    } else {
      await Like.destroy({
        where: {
          userId,
          feedId
        }
      })

      return res.send({
        status: 'success',
        message: 'Feed is Disliked'
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getComments = async (req, res) => {
  try {
    const feedId = +req.params.id
    const { idUser: userId } = req.authData

    if (!feedId) {
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter required!'
      })
    }

    const feedIsExist = await Feed.findOne({
      where: { id: feedId }
    })

    if (!feedIsExist) {
      return res.status(404).send({
        status: 'failed',
        message: `Feed with ID: ${feedId} is Not Found`
      })
    }

    const comments = await Comment.findAll({
      where: { feedId },
      include: {
        model: User,
        required: true,
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['userId', 'feedId', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      data: {
        comments
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.addComment = async (req, res) => {
  try {
    const { body } = req
    const { idUser: userId } = req.authData

    const schema = joi.object({
      id_feed: joi.number().required(),
      comment: joi.string().required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const feedIsExists = await Feed.findOne({
      where: { id: body.id_feed }
    })

    if (!feedIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `Feed with ID: ${body.id_feed} is Not Found`
      })
    }

    const addNewComment = await Comment.create({
      userId,
      feedId: body.id_feed,
      comment: body.comment,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    res.send({
      status: 'success',
      data: {
        comment: { id: addNewComment.id }
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}