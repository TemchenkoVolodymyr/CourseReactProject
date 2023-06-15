import React from 'react';
import styles from '../../UserProfile.module.scss'
import CircleRating from "../../../CircleRating/CircleRating";
import ActionsComponent from "../ActionsComponent/ActionsComponent";
import {NavLink} from "react-router-dom";

const FilmComponent = ({id, image, title, rating, overview, release}) => {

  const date = new Date(release);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={styles.movieBlock}>
      <div
        className={styles.image}
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${image})`}}>
      </div>
     <div className={styles.info}>
       <div className={styles.movieTitle}>
         <CircleRating rating={rating} size={70} displayAsPercentage={true}/>
         <div>
           <NavLink to={`/movie/${id}`}>
             <h2>{title}</h2>
           </NavLink>

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