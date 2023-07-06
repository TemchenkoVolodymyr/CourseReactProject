import { Rating } from '../models/models.js';
import ApiError from '../error/ApiError.js';
export default class RatingController {
  async create(req, res, next) {
    try{
      const { userId, rate, movieId } = req.body;
      if (!userId || !rate || !movieId) {
        return res.status(400).json({ message: 'User id and rate are required' });
      }
      const rating = await Rating.create({ userId, rate, movieId });
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUserRatings(req, res) {
    const { userId } = req.params;
    const ratings = await Rating.findAll({
      where: { userId: userId },
    });
    return res.json(ratings);
  }

  async deleteUserRating(req, res) {
    const { movieId } = req.params;
    await Rating.destroy({
      where: { movieId },
    });
    return res.sendStatus(204);
  }

}