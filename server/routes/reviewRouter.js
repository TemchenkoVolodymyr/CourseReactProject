import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import ReviewController from "../controllers/reviewController.js";


const router = new Router()
const reviewController = new ReviewController();

router.post('/', authMiddleware, reviewController.create)
router.get('/user/:userId', reviewController.getUserReviews);
router.get('/movie/:movieId', reviewController.getMovieReviews);
router.delete('/:movieId', reviewController.deleteUserReview);


export default router