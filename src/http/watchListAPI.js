import {$authHost, $host} from "./index";

export const createWatchList = async (userId, movieId) => {
  try {
    const {data} = await $authHost.post('api/watchlist', {
      userId,
      movieId
    });
    return [data]
  } catch (e) {
    console.error("Error creating rating:", e);
    return null;
  }
}

export const fetchUserWatchList = async(userId) => {
  const {data} = await $host.get('api/watchlist/' + userId)
  return data
}

export const deleteWatchListFromDatabase = async (movieId) => {
  try {
    await $authHost.delete(`api/watchlist/${movieId}`);
  } catch (error) {
    console.log(error);
  }
};