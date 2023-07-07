import {$authHost, $host} from "./index";

export const createReview = async (userId, movieId, text) => {
  try {
    const {data} = await $authHost.post('api/review', {
      userId,
      movieId,
      text
    });
    return [data]
  } catch (e) {
    console.error("Error creating rating:", e);
    return null;
  }
}

export const fetchMovieReviews = async(movieId) => {
  const {data} = await $host.get('api/review/movie/' + movieId)
  return data
}

export const deleteFavoriteFromDatabase = async (movieId) => {
  try {
    await $authHost.delete(`api/review/${movieId}`);
  } catch (error) {
    console.log(error);
  }
};