import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import FavoriteController from "../controllers/favoriteController.js";


const router = new Router()
const favoriteController = new FavoriteController();

router.post('/', authMiddleware, favoriteController.create)
router.get('/:userId', favoriteController.getUserFavorites);
router.delete('/:movieId', favoriteController.deleteUserFavorite);


export default router