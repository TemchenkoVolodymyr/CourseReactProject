import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt'
import {User} from '../models/models.js';
import jwt from 'jsonwebtoken'

const generateJwt = (id, email, role, userName) => {
  return jwt.sign(
    { id, email, role, userName },
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}
export default class UserController {
  async registration(req, res, next) {
    const {email, password, userName,  role} = req.body
    if (!email || !password || !userName) {
      return next(ApiError.badRequest('Email or password incorrect'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Email already exist'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashPassword, userName})
    const token = generateJwt(user.id, user.email, user.role, user.userName)
    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('User not found'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword) {
      return next(ApiError.internal('Wrong Password'))
    }

    const token = generateJwt(user.id, user.email, user.role, user.userName)
    return res.json({token})
  }
  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.role,
      req.user.userName
    );

    const createdAt = await getUserCreatedAt(req.user.id);

    return res.json({
      token,
      createdAt
    });
  }

  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

}

async function getUserCreatedAt(userId) {
  const user = await User.findByPk(userId);
  if (user) {
    return user.createdAt;
  }
  return null;
}
