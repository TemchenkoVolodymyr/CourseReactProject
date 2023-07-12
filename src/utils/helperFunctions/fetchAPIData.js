import axios from 'axios';


export const fetchAPIDataWithOptions = async (arg, options) => {
  try {
    const appendValues = Object.entries(options)
      .filter(([key, value]) => value)
      .map(([key]) => key)
      .join(',');
    const { data } = await axios.get(`https://api.themoviedb.org/3/${arg}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=${appendValues}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAPIDataWithOutOptions = async (arg) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${arg}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
    return data;
  } catch (err) {
    alert('Error');
  }
};

