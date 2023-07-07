import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from 'react';
import CustomButton from '../../Components/Button/CustomButton';
import style from './ModalForReviews.module.scss';
import {createReview} from "../../http/reviewAPI";

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
const stylePhoneModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'rgb(0 0 0 / 83%)',
  boxShadow: 24,
  p: 4,
  color: 'white',
  maxHeight: '600px',
  overflowY: 'scroll',
};

export default function ModalForReviews({
                                          callback,
                                          open,
                                          movie,
                                          movieId,
                                          reviews,
                                          userId
                                        }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [value, setValue] = useState('')

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendReviewHandler = (value) => {
    if (value) {
      createReview(userId, movieId, value)
      setValue('');
    }
  };


  return (
    <div className={style.modal}>
      <Modal
        open={open}
        onClose={callback}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={windowWidth >= 360 && windowWidth < 768 ? stylePhoneModal : styleModal}
             style={{width: '100vh', height: '60vh'}}>
          <div className={style.wrapperCloseModalBtn}>
            {windowWidth >= 360 && windowWidth < 768 ?
              <CustomButton callback={callback} name={'Close the modal'}></CustomButton> : null}
          </div>
          <Typography id="modal-modal-title" variant="h6" component="div">
            <h1>{`Leave your review for "${movie.original_title}"`}</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}} component="div" className={style.wrapperInput}>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="write your review"/>
            <Button
              onClick={() => sendReviewHandler(value)} >SEND</Button>
            <div>
              {reviews && reviews.map((review, i) => <div className={style.reviews} key={i}>
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