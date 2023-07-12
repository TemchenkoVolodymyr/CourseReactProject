import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPIDataWithOutOptions } from '../../utils/helperFunctions/fetchAPIData';


export const fetchPopularMovies = createAsyncThunk(
  'popMoviesSlice/fetchPopularMovies',
  async () => {
    try {
      const data = await fetchAPIDataWithOutOptions('movie/popular');
      return data.results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
export const popMoviesSlice = createSlice({
  name: 'popMovies',
  initialState: {
    popularMovies: [],
    isLoading: false,
    error:  null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});


export default popMoviesSlice.reducer;