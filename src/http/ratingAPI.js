import { $authHost, $host } from './index';


export const createRating = async (userId, movieId, rate) => {
  try {
    const { data } = await $authHost.post('api/rating', {
      userId,
      movieId,
      rate
    });
    return [data];
  } catch (e) {
    console.error('Error creating rating:', e);
    return null;
  }
};

export const fetchUserRatings = async(userId) => {
  const { data } = await $host.get('api/rating/' + userId);
  return data;
};

export const deleteRatingFromDatabase = async (movieId) => {
  try {
    await $authHost.delete(`api/rating/${movieId}`);
  } catch (error) {
    console.log(error);
  }
};