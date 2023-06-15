import React from 'react';
import styles from '../../UserProfile.module.scss'
import CircleRating from "../../../CircleRating/CircleRating";
import ActionsComponent from "../ActionsComponent/ActionsComponent";

const FilmComponent = ({image, title, rating, overview, release}) => {

  const date = new Date(release);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={styles.movieBlock}>
      <img src={`https://image.tmdb.org/t/p/original${image}`} alt=""/>
     <div className={styles.info}>
       <div className={styles.movieTitle}>
         <CircleRating rating={rating} size={70} displayAsPercentage={true}/>
         <div>
           <h2>{title}</h2>
           <p>{formattedDate}</p>
         </div>
       </div>
       <div className={styles.movieInfo}>
        <div className={styles.overview}>
          <p>{overview}</p>
        </div>
         <ActionsComponent/>
       </div>
     </div>
    </div>
  );
};

export default FilmComponent;