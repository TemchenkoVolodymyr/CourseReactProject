import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './MoviePage.module.scss';
import axios from 'axios';
import ActionBar from '../../Components/Action Bar/ActionBar';
import CustomButton from '../../Components/Button/CustomButton';
import Loader from '../../Loader/Loader';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import MainBanner from '../../Components/MoviePage Components/MainBanner';
import OverviewSection from '../../Components/MoviePage Components/OverviewSection';
import TopBilledCast from '../../Components/MoviePage Components/TopBilledCast';
import SimilarBlock from '../../Components/MoviePage Components/SimilarBlock';
import SliderForReview from './SliderForReview';
import ModalForReviews from './ModalForReviews';
import {loadUserRatings} from "../../redux/backend/ratingBackendSlice";
import {loadUserFavorites} from "../../redux/backend/favoriteBackendSLice";
import {loadMovieReviews} from "../../redux/backend/reviewBackendSlice";
import {fetchMovieReviews} from "../../http/reviewAPI";


const MoviePage = () => {
  const { title } = useParams();
  const movieId = localStorage.getItem('movieId');
  const [movie, setMovie] = useState();
  const dispatch = useDispatch();
  const {reviews, status} = useSelector((state) => state.reviews);
  const [openModal, setOpenModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userId = useSelector(state => state.users.user.id)

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovie(data);

      } catch (err) {
        alert('Error');
      }
    }
    if (userId) {
      dispatch(loadUserRatings(userId));
      dispatch(loadUserFavorites(userId))
    }
    dispatch(loadMovieReviews(movieId))
    fetchMovie();

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, userId]);

  if (!movie) {
    return <Loader/>;
  }
  return (
    <>
      <Helmet>
        <title>{movie.title} | Overview, Ratings and Trailer </title>
      </Helmet>
      <ActionBar movie={movie} movieId={movie.id} source="moviePage" />
      <div className={style.wrapper}>
        <MainBanner movie={movie}/>
        <h2>Overview</h2>
        <OverviewSection movie={movie} windowWidth={windowWidth}/>
        <h2>Top Billed Cast</h2>
        <TopBilledCast movie={movie} windowWidth={windowWidth}/>
        <section >
        <div className={style.reviewsContainer}>
          <div className={style.headerReviews}>
            <h1>Reviews</h1>
            <CustomButton callback={handleOpen} name={'Leave review'}/>
          </div>
          <p>{`About film "${movie.original_title}"`}</p>
        </div>
        </section>

        {status === 'loading' ? <p>...Loading</p> :
          <>
            <SliderForReview  reviews={reviews}/>

          </>}
        <h2>Similar</h2>
        <SimilarBlock movie={movie} windowWidth={windowWidth}/>
      </div>
      <ModalForReviews
        reviews={reviews}
        movie={movie}
        open={openModal}
        callback={handleClose}
        movieId={movieId}
        userId={userId}
        />
    </>
  );
};

export default MoviePage;


