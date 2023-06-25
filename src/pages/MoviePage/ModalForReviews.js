import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CustomButton from '../../Components/Button/CustomButton';
import style from './ModalForReviews.module.scss';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(0 0 0 / 83%)',
  boxShadow: 24,
  p: 4,
  color: 'white',
  maxHeight: '600px',
  overflowY: 'scroll',
};

export default function ModalForReviews(props) {


  const { callback, open, value, setValue, placeholder, movie, reviews, sendReview } = props;

  return (
    <div className={style.modal}>
      <Modal
        open={open}
        onClose={callback}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={style.container}>
              <h1>{`Leave your review for "${movie.original_title}"`}</h1>
              <div className={style.description}>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}/>
                <p>Language : {movie.original_language}</p>
                <p>Release date : {movie.release_date}</p>
                <p>Rating : {Math.round(movie.vote_average * 10 / 10)}</p>
              </div>
            </div>

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={style.wrapperInput}>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}/>
              <CustomButton value={value} callback={sendReview} name={'Send'}></CustomButton>
            </div>
            <div>
              {reviews && reviews.map((review) => <div className={style.reviews}>
                <div className={style.headerReview}>
                  <p className={style.headerInfo}>{review.user}</p>
                  <p className={style.headerInfo}>{review.date}</p>
                </div>
                <p className={style.text}>{review.text}</p>
              </div>)}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}