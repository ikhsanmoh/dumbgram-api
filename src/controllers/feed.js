const {
  user: User,
  feed: Feed,
  comment: Comment,
  followed_user: FollowedUser,
  like: Like
} = require('../../models')

const sequelize = require('sequelize')

exports.createFeed = async (req, res) => {
  try {
    const { image, caption } = req.body
    const { idUser } = req.authData

    const createdData = await Feed.create({
      userId: idUser,
      fileName: image,
      caption: caption,
      like: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const userFeeds = await Feed.findOne({
      where: { id: createdData.id },
      include: {
        model: User,
        as: 'user',
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
        feed: userFeeds
      }
    })

  } catch (e) {
    console.log(e)
    res.status({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getFollowedFeeds = async (req, res) => {
  try {
    const followerId = +req.params.id

    const userIsExists = await User.findOne({
      where: { id: followerId }
    })

    if (!userIsExists) {
      return res.send({
        status: 'failed',
        message: `User with ID: ${followerId} is Not Found`
      })
    }

    const feeds = await Feed.findAll({
      include: [
        {
          model: Like,
          as: 'likes',
          attributes: []
        },
        {
          model: User,
          as: 'user',
          required: true,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: {
            model: FollowedUser,
            as: 'user_followers',
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
    res.status({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getFeeds = async (req, res) => {
  try {
    const getData = await Feed.findAll({
      include: [
        {
          model: Like,
          as: 'likes',
          attributes: []
        },
        {
          model: User,
          as: 'user',
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
        feeds: getData
      }
    })

  } catch (e) {
    console.log(e)
    res.status({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.addLike = async (req, res) => {
  try {
    const feedId = +req.body.id
    const { idUser: userId } = req.authData

    if (feedId == null) {
      return res.send({
        status: 'failed',
        message: `Feed with ID: ${feedId} is Not Found`
      })
    }

    const postIsExists = await Feed.findOne({
      where: { id: feedId }
    })

    if (!postIsExists) {
      return res.send({
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
    res.status({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getComments = async (req, res) => {
  try {
    const feedId = +req.params.id
    const { idUser: userId } = req.authData

    const feedIsExist = await Feed.findOne({
      where: { id: feedId }
    })

    if (!feedIsExist) {
      return res.send({
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
    res.status({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.addComment = async (req, res) => {
  try {
    const { id_feed: feedId, comment } = req.body
    const { idUser: userId } = req.authData

    if (!feedId) {
      return res.send({
        status: 'failed',
        message: `Feed ID is required.`
      })
    }

    if (!comment) {
      return res.send({
        status: 'failed',
        message: 'Comment connot be empty.'
      })
    }

    const feedIsExists = await Feed.findOne({
      where: { id: feedId }
    })

    if (!feedIsExists) {
      return res.send({
        status: 'failed',
        message: `Feed with ID: ${feedId} is Not Found`
      })
    }

    Comment.create({
      userId,
      feedId,
      comment,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(result => {
      return res.send({
        status: 'success',
        data: {
          comment: { id: result.id }
        }
      })
    }).catch(err => {
      return res.send({
        status: 'failed',
        message: 'Cannot create comment.',
        errLog: err
      })
    });
  } catch (e) {
    console.log(e)
    res.status({
      status: "failed",
      message: "Server Error"
    })
  }
}