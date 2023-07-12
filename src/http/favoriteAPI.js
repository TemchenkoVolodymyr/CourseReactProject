import { $authHost, $host } from './index';


export const createFavorite = async (userId, movieId) => {
  try {
    const { data } = await $authHost.post('api/favorite', {
      userId,
      movieId
    });
    return [data];
  } catch (e) {
    console.error('Error creating rating:', e);
    return null;
  }
};

export const fetchUserFavorites = async(userId) => {
  const { data } = await $host.get('api/favorite/' + userId);
  return data;

};

export const deleteFavoriteFromDatabase = async (movieId) => {
  try {
    await $authHost.delete(`api/favorite/${movieId}`);
  } catch (error) {
    console.log(error);
  }
};