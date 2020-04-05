const jwt = require('jsonwebtoken');
const { ForbiddenError } = require('apollo-server-express')

exports.verifyToken = function (req, res, next) {
  const header = req.headers["authorization"];

  if (typeof header !== 'undefined') {
    const token = header.split(' ');
    if (token[0] !== 'Bearer') throw new ForbiddenError('Token not provided')
    if (!token[1]) throw new ForbiddenError('Token not provided')

    try {
      const decodedToken = jwt.verify(token[1], process.env.SERVER_SECRET)
      return decodedToken;
    } catch (err) {
      throw new ForbiddenError('Invalid token')
    }
  } else {
    return null
  }
}