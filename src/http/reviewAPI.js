import { $authHost, $host } from './index';


export const createReview = async (userId, movieId, text) => {
  try {
    const { data } = await $authHost.post('api/review', {
      userId,
      movieId,
      text
    });
    return [data];
  } catch (e) {
    console.error('Error creating rating:', e);
    return null;
  }
};

export const fetchMovieReviews = async(movieId) => {
  const { data } = await $host.get('api/review/movie/' + movieId);
  return data;
};

export const fetchUserReviews = async(userId) => {
  const { data } = await $host.get('api/review/user/' + userId);
  return data;
};

export const updateReview = async (reviewId, userId, movieId, text) => {
  try {
    const { data } = await $authHost.put('api/review/edit/' + reviewId, {
      userId,
      movieId,
      text
    });
    return [data];
  } catch (e) {
    console.error('Error updating review:', e);
    return null;
  }
};

export const deleteReviewFromDatabase = async (reviewId) => {
  try {
    await $host.delete(`api/review/remove/${reviewId}`);
  } catch (error) {
    console.log(error);
  }
};


