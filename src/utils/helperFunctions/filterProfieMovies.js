

export const filterProfileMovies = (arr, filterBy, page) => {
  const arrCopy = [...arr];

  switch (filterBy) {
    case 'Release Date':
      return arrCopy.sort((a, b) => new Date(b.movieInfo.release_date) - new Date(a.movieInfo.release_date));
    case 'Popularity':
      return arrCopy.sort((a, b) => b.movieInfo.popularity - a.movieInfo.popularity);
    case 'Rating':
      if (page === 'page2') {
        return arrCopy.sort((a, b) => b.rating - a.rating);
      } else {
        return arrCopy.sort((a, b) => b.movieInfo.vote_average - a.movieInfo.vote_average);
      }
    case 'Runtime':
      return arrCopy.sort((a, b) => b.movieInfo.runtime - a.movieInfo.runtime);
    case 'Date Added':
      return arrCopy.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    default:
      return arrCopy;
  }
};

export const applySortOrder = (arr, isOrderOpen) => {

  if (isOrderOpen) {
    return arr.reverse();
  }
  return arr;
}