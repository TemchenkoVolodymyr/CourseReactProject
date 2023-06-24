import React from 'react';
import { Modal } from '@mui/material';
import './MoviePlayer.modul.scss';
const MoviePlayerModal = ({ isPlayerOpen, movie, setIsPlayerOpen }) => {


  return (
    <>
      <Modal open={isPlayerOpen} onClose={() => setIsPlayerOpen(false)}>
        <div className="modal">
          <div className="modal-content">
            {movie.videos.results.length > 0 && (
              <div>
                {movie?.videos.results
                  .filter((video) => video.type === 'Trailer')
                  .slice(0, 1)
                  .map((video) => (
                    <div key={video.key}>
                      <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
              </div>
            )}

          </div>
        </div>
      </Modal>
    </>
  );
};

export default MoviePlayerModal;