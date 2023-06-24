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
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const { callback, open, value, setValue, placeholder, movie ,reviews } = props;
  return (
    <div>
      {/*<Button onClick={handleOpen}>Open modal</Button>*/}
      <Modal
        open={open}
        onClose={callback}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>
              <h1>{movie.original_title}</h1>
              <div>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}/>
              </div>
              <div>
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
              <CustomButton name={'send'}></CustomButton>
            </div>
            <div>
              { reviews && reviews.map((review) => <p>{review.text}</p>  )}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}