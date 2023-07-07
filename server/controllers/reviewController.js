
import ApiError from "../error/ApiError.js";
import {Favorite, Review, User} from "../models/models.js";

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

  async updateReview(req, res, next) {
    try {
      const { userId, movieId, text } = req.body;
      const { reviewId } = req.params;

      if (!userId || !movieId || !text || !reviewId) {
        return res.status(400).json({ message: 'User id, movie id, review id and text are required' });
      }

      const review = await Review.findOne({ where: { id: reviewId, userId: userId, movieId: movieId } });

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      review.text = text;
      await review.save();

      return res.json(review);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeReview(req, res) {
    const { reviewId } = req.params;
    await Review.destroy({
      where: { id: reviewId },
    });
    return res.sendStatus(204);
  }
}