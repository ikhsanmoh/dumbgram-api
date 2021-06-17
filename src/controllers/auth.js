const { user: User } = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registration = async (req, res) => {
  try {
    const { body } = req

    const schema = joi.object({
      fullName: joi.string().min(6).required(),
      username: joi.string().min(6).required(),
      email: joi.string().email().min(8).required(),
      password: joi.string().min(8).required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const emailValidation = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (emailValidation) {
      return res.send({
        status: 'failed',
        message: 'Email already registered'
      })
    }

    const hashStrenght = 10
    const hashedPass = await bcrypt.hash(body.password, hashStrenght)

    User.create({
      fullName: body.fullName,
      email: body.email,
      username: body.username,
      password: hashedPass,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(result => {
      const accessToken = jwt.sign({
        id: result.id
      }, process.env.SECRET_KEY)

      return res.send({
        status: 'success',
        data: {
          user: {
            fullName: result.fullName,
            username: result.username,
            token: accessToken
          }
        }
      })
    }).catch(err => {
      res.send({
        status: 'failed',
        message: 'Error on create new data!',
        errLog: err
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

exports.login = async (req, res) => {
  try {
    const { body } = req

    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      password: joi.string().min(8).required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const emailValidation = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (!emailValidation) {
      return res.send({
        status: 'failed',
        message: 'Invalid Email or Password!'
      })
    }

    const passwordValidation = await bcrypt.compare(body.password, emailValidation.password)

    if (!passwordValidation) {
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