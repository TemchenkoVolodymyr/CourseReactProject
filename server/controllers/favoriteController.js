import {Favorite} from "../models/models.js";
import ApiError from "../error/ApiError.js";




export default class FavoriteController {
  async create(req, res, next) {
    try{
      const { userId, movieId } = req.body;
      if (!userId || !movieId) {
        return res.status(400).json({ message: 'User id and rate are required' });
      }
      const favorite = await Favorite.create({ userId, movieId });
      return res.json(favorite);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUserFavorites(req, res) {
    const { userId } = req.params;
    const ratings = await Favorite.findAll({
      where: { userId: userId },
    });
    return res.json(ratings);
  }

  async deleteUserFavorite(req, res) {
    const { movieId } = req.params;
    await Favorite.destroy({
      where: { movieId },
    });
    return res.sendStatus(204);
  }

}