const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
      return res.send({
        status: 'failed',
        message: 'Access Denied.'
      })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.send({
          status: 'failed',
          message: 'Invalid Token.'
        })
      } else {
        req.authData = {
          idUser: decoded.id,
          token
        }
        next()
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