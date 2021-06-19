const { user: User, follower: Follower } = require('../../models')

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
    res.status(500).send({
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
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

    await User.update(body, {
      where: { id }
    })

    const updatedUser = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      data: {
        user: updatedUser
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

exports.deleteUser = async (req, res) => {
  try {
    const id = +req.params.id

    if (!id) {
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.status(404).send({
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
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getFollowers = async (req, res) => {
  try {
    const id = +req.params.id

    if (!id) {
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

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
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getFollowing = async (req, res) => {
  try {
    const id = +req.params.id

    if (!id) {
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter cannot be empty!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id }
    })

    if (!userIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `User with ID: ${id} is Not Found`
      })
    }

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
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}