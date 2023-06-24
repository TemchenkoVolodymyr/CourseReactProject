import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './MoviePage.module.scss';
import axios from 'axios';
import ActionBar from '../../Components/Action Bar/ActionBar';
import CustomButton from '../../Components/Button/CustomButton';
import Loader from '../../Loader/Loader';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, setReview } from '../../redux/slices/reviewsSlice';
import MainBanner from '../../Components/MoviePage Components/MainBanner';
import OverviewSection from '../../Components/MoviePage Components/OverviewSection';
import TopBilledCast from '../../Components/MoviePage Components/TopBilledCast';
import SimilarBlock from '../../Components/MoviePage Components/SimilarBlock';


const MoviePage = () => {
  const { title } = useParams();
  const movieId = localStorage.getItem('movieId');
  const [movie, setMovie] = useState();
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const status = useSelector((state) => state.reviews.status);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovie(data);
      } catch (err) {
        alert('Error');
      }
    }
    dispatch(fetchReviews(movieId));
    fetchMovie();

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [title, movieId]);

  const sendReviewHandler = (review) => {
    if (review) {
      dispatch(setReview({id: movieId, text: review}))
      setValue('');
    }
  };

  if (!movie) {
    return <Loader/>;
  }
  return (
    <>
      <Helmet>
        <title>{movie.title} | Overview, Ratings and Trailer </title>
      </Helmet>
      <ActionBar movie={movie} movieId={movie.id}/>
      <div className={style.wrapper}>
        <MainBanner movie={movie}/>
        <h2>Overview</h2>
        <OverviewSection movie={movie} windowWidth={windowWidth}/>
        <h2>Top Billed Cast</h2>
        <TopBilledCast movie={movie} windowWidth={windowWidth}/>
        <section className={style.reviewsContainer}>
          <h1>Write Your Review</h1>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="write your review"/>
          <CustomButton name="Write" callback={() => sendReviewHandler(value)}></CustomButton>
        </section>

        {reviews && <h1 className={style.header}>Reviews :</h1>}
        {status === 'loading' ? <p>...Loading</p> :
          <>
            {reviews ? reviews?.map((item, i) => <div key={i} className={style.wrapperReview}>
              <div className={style.reviews}>
                <p>{item.text}</p>
                <div>
                  <p>{item.user}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </div>) : <p>There are no reviews </p>}
          </>}
        <h2>Similar</h2>
        <SimilarBlock movie={movie} windowWidth={windowWidth}/>
      </div>
    </>
  );
};

export default MoviePage;


