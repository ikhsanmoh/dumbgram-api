const { user: User, follower: Follower } = require('../../models')

exports.getUsers = async (req, res) => {
  try {
    User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }).then(users => {
      res.send({
        status: 'success',
        data: {
          users
        }
      })
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
    const { body } = req

    if (!id) {
      return res.send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

    User.update(body, {
      where: { id }
    }).then(() => {
      User.findOne({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        },
        where: { id }
      }).then(result => {
        res.send({
          status: 'success',
          data: {
            user: result
          }
        })
      })
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

    if (!id) {
      return res.send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

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

    res.send({
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

    if (!id) {
      return res.send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

    // Get the user Follower by given Id
    const followers = await Follower.findAll({
      where: { followedId: id },
      include: {
        model: User,
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
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

    if (!id) {
      return res.send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

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
    const following = await Follower.findAll({
      where: { followerId: id },
      include: {
        model: User,
        as: 'usr',
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
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