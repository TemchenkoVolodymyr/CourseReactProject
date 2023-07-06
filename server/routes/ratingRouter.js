import Router from "express";
import RatingController from "../controllers/ratingController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";


const router = new Router()
const ratingController = new RatingController();

router.post('/', authMiddleware, ratingController.create)
router.get('/:userId', ratingController.getUserRatings);
router.delete('/:movieId', ratingController.deleteUserRating);


export default router