import Router from 'express'
import {authMiddleware} from '../middleware/authMiddleware.js'
import WatchListController from "../controllers/watchListController.js";

const router = new Router()

const watchListController = new WatchListController();

router.post('/', authMiddleware, watchListController.create)
router.get('/:userId', watchListController.getUserFavorites);
router.delete('/:movieId', watchListController.deleteUserFavorite);

export default router