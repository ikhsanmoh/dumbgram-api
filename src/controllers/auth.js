const { user: User } = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')

exports.registration = async (req, res) => {
  try {
    const { email } = req.body
    const data = req.body

    console.log("--request body", data)

    const schema = joi.object({
      fullName: joi.string().min(6).required(),
      username: joi.string().min(6).required(),
      email: joi.string().email().min(8).required(),
      password: joi.string().min(8).required()
    })

    const { error } = schema.validate(data)

    if (error) {
      return res.send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const emailValidation = await User.findOne({
      where: {
        email
      }
    })

    console.log(emailValidation)

    if (emailValidation) {
      return res.send({
        status: 'failed',
        message: 'Email already registered'
      })
    }

    const insertData = await User.create({
      fullName: data.fullName,
      email: data.email,
      username: data.username,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const accessToken = jwt.sign({
      id: insertData.id
    }, process.env.SECRET_KEY)

    res.send({
      status: 'success',
      data: {
        user: {
          fullName: insertData.fullName,
          username: insertData.username,
          token: accessToken
        }
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const data = req.body

    const schema = joi.object({
      email: joi.string().email().min(8).required(),
      password: joi.string().min(8).required()
    })

    const { error } = schema.validate(data)

    if (error) {
      return res.send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const emailValidation = await User.findOne({
      where: {
        email
      }
    })

    const passwordValidation = await User.findOne({
      where: {
        password
      }
    })

    if (!emailValidation || !passwordValidation) {
      return res.send({
        status: 'failed',
        message: 'Invalid Email or Password!'
      })
    }

    const accessToken = jwt.sign({
      id: emailValidation.id
    }, process.env.SECRET_KEY)

    res.send({
      status: 'success',
      data: {
        user: {
          fullName: emailValidation.fullName,
          username: emailValidation.username,
          email: emailValidation.email,
          token: accessToken
        }
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