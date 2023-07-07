
import ApiError from "../error/ApiError.js";
import {Review, User} from "../models/models.js";

export default class ReviewController {
  async create(req, res, next) {
    try{
      const { userId, movieId, text } = req.body;
      if (!userId || !movieId || !text) {
        return res.status(400).json({ message: 'User id and text are required' });
      }
      const review = await Review.create({ userId, movieId, text });
      return res.json(review);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUserReviews(req, res) {
    const { userId } = req.params;
    const reviews = await Review.findAll({
      where: { userId: userId },
    });
    return res.json(reviews);
  }

  async getMovieReviews(req, res) {
    const { movieId } = req.params;
    try {
      const reviews = await Review.findAll({
        where: { movieId: movieId  },
        include: { model: User, attributes: ['userName'] }
      });
      return res.json(reviews);
    } catch (error) {
      console.error('Error retrieving movie reviews:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  async deleteUserReview(req, res) {
    const { movieId } = req.params;
    await Review.destroy({
      where: { movieId },
    });
    return res.sendStatus(204);
  }



}