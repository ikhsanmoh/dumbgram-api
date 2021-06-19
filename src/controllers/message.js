const {
  user: User,
  message: Message
} = require('../../models')

const joi = require('joi')
const { Op } = require("sequelize");

exports.addMessage = async (req, res) => {
  try {
    const receiverId = +req.params.id
    const { body } = req
    const { idUser: userId } = req.authData

    if (!receiverId) {
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter is required!'
      })
    }

    if (userId == receiverId) {
      return res.status(400).send({
        status: 'failed',
        message: 'Invalid User ID!'
      })
    }

    const schema = joi.object({
      message: joi.string().required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const userIsExists = await User.findOne({
      where: { id: receiverId },
    })

    if (!userIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `User/Receiver with ID: ${receiverId} is Not Found`
      })
    }

    const addMessage = await Message.create({
      senderId: userId,
      receiverId,
      message: body.message,
      createt: new Date(),
      updatedAt: new Date()
    })

    const newMessage = await Message.findAll({
      where: { id: addMessage.id },
      include: {
        model: User,
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['senderId', 'receiverId', 'createdAt', 'updatedAt']
      }
    })

    return res.send({
      status: 'success',
      data: {
        message: newMessage
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

exports.getMessages = async (req, res) => {
  try {
    const receiverId = +req.params.id
    const { idUser: userId } = req.authData

    if (!receiverId) {
      return res.status(400).send({
        status: 'failed',
        message: 'ID parameter is required!'
      })
    }

    if (userId == receiverId) {
      return res.status(400).send({
        status: 'failed',
        message: 'Invalid User ID!'
      })
    }

    const userIsExists = await User.findOne({
      where: { id: receiverId },
    })

    if (!userIsExists) {
      return res.status(404).send({
        status: 'failed',
        message: `User/Receiver with ID: ${receiverId} is Not Found`
      })
    }

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ senderId: userId }, { receiverId }],
          },
          {
            [Op.and]: [{ senderId: receiverId }, { receiverId: userId }]
          }
        ]
      },
      include: {
        model: User,
        required: true,
        attributes: {
          exclude: ['email', 'password', 'bio', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['senderId', 'receiverId', 'createdAt', 'updatedAt']
      },
      order: [
        'createdAt'
      ]
    })

    res.send({
      status: 'success',
      data: {
        message: messages
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