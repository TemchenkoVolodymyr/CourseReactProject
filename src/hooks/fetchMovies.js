import axios from "axios";

export const fetchMovie = async (setData) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setData(data.results);
    } catch (err) {
        alert('Error');
    }
}