import {Watchlist} from "../models/models.js";
import ApiError from "../error/ApiError.js";

export default class WatchListController {
  async create(req, res, next) {
    try{
      const { userId, movieId } = req.body;
      if (!userId || !movieId) {
        return res.status(400).json({ message: 'User id and rate are required' });
      }
      const film = await Watchlist.create({ userId, movieId });
      return res.json(film);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUserFavorites(req, res) {
    const { userId } = req.params;
    const films = await Watchlist.findAll({
      where: { userId: userId },
    });
    return res.json(films);
  }

  async deleteUserFavorite(req, res) {
    const { movieId } = req.params;
    await Watchlist.destroy({
      where: { movieId },
    });
    return res.sendStatus(204);
  }

}