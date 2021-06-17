const { user: User, followed_user: FollowedUser } = require('../../models')

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      data: {
        users
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

exports.updateUser = async (req, res) => {
  try {
    const id = +req.params.id
    const body = req.body

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

    await User.update(body, {
      where: { id }
    })

    const updatedData = await User.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      where: { id }
    })

    res.send({
      status: 'success',
      data: {
        user: updatedData
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

exports.deleteUser = async (req, res) => {
  try {
    const id = +req.params.id

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

    await User.destroy({
      where: { id }
    })

    return res.send({
      status: "success",
      data: { id }
    })
  } catch (e) {
    console.log(e)
    res.status({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getFollowers = async (req, res) => {
  try {
    const id = +req.params.id

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

    // Get the user Followers by given Id
    const followers = await FollowedUser.findAll({
      where: { followedId: id },
      include: {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['email', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['followerId', 'followedId', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: "success",
      data: {
        followers
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

exports.getFollowing = async (req, res) => {
  try {
    const id = +req.params.id

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

    // Get the followed users by given Id
    const following = await FollowedUser.findAll({
      where: { followerId: id },
      include: {
        model: User,
        as: 'usr',
        attributes: {
          exclude: ['email', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['followerId', 'followedId', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: "success",
      data: {
        following
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