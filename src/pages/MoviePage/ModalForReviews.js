import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
import CustomButton from '../../Components/Button/CustomButton';
import style from './ModalForReviews.module.scss';
import {createReview} from "../../http/reviewAPI";
import {loadMovieReviews} from "../../redux/backend/reviewBackendSlice";
import {useDispatch} from "react-redux";
import {useMediaQuery} from "@mui/material";

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
                                          userId
                                        }) {

  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 768px)');

  const sendReviewHandler = (value) => {
    if (value) {
      createReview(userId, movieId, value)
        .then(data => dispatch(loadMovieReviews(movieId)))
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
        <Box sx={isMobile ? stylePhoneModal : styleModal}
             style={{width: '100vh', height: '60vh'}}>
          <div className={style.wrapperCloseModalBtn}>
            {isMobile ?
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
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}