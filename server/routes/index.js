import Router from 'express'
import userRouter from './userRouter.js'
import ratingRouter from './ratingRouter.js'
import favoriteRouter from "./favoriteRouter.js";
import watchListRouter from "./watchListRouter.js";
import reviewRouter from "./reviewRouter.js";

const router = new Router()

router.use('/user', userRouter)
router.use('/rating', ratingRouter)
router.use('/favorite', favoriteRouter)
router.use('/watchlist', watchListRouter)
router.use('/review', reviewRouter)

export default router