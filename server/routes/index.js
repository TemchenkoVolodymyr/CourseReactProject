import Router from 'express'
import userRouter from './userRouter.js'
import ratingRouter from './ratingRouter.js'
import favoriteRouter from "./favoriteRouter.js";

const router = new Router()

router.use('/user', userRouter)
router.use('/rating', ratingRouter)
router.use('/favorite', favoriteRouter)

export default router