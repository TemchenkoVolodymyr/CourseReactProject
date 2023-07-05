import jwt from 'jsonwebtoken'

export const checkRoleMiddleware = (role) => {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        res.status(401).json({message: 'user not authorized'})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.role !== role) {
        return res.status(403).json({message: 'No rights'})
      }

      req.user = decoded
      next()

    } catch (e) {
      res.status(401).json({message: 'user not authorized'})
    }
  }
}