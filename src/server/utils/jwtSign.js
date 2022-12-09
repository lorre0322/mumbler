const jwt = require('jsonwebtoken')
const SECRET = 'Mumbler'

async function jwtSign(payload, secretOrPrivateKey, options) {
  return jwt.sign(payload, secretOrPrivateKey, options)
}

async function jwtVerify(token, secretOrPublicKey) {
  return jwt.verify(token, secretOrPublicKey, (err, decoded) => {
    if (err) {
      console.log('Token exception')
      switch (err.name) {
        case 'TokenExpiredError':
          return { msg: 'Token overdue' }
        case 'JsonWebTokenError':
          return { msg: 'Token invalid' }
      }
    }
    return decoded
  })
}

async function verifyToken(token) {
  const data = await jwtVerify(token, SECRET)
  if (data.msg) return false
  if (data.id) {
    const condition = data.id === global.Mconfig.id.toString()
    if (condition) return true
    return false
  }
}
module.exports = {
  SECRET,
  jwtSign,
  verifyToken
}
