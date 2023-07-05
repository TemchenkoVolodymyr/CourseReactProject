import Router from 'express'
import UserController from '../controllers/userController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = new Router()

const userController = new UserController();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check )
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)

export default router

