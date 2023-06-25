import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import style from './ActorPage.module.scss';
import { Helmet } from 'react-helmet';
import PersonalInfoSection from '../../Components/ActorPage Components/PersonalInfoSection';
import BiographySection from '../../Components/ActorPage Components/BiographySection';
import ActorCreditsFilter from '../../Components/ActorPage Components/ActorCreditsList/ActorCreditsFilter';


const ActorPage = () => {

  const { name } = useParams();
  const [actors, setActors] = useState();
  const actorId = localStorage.getItem('actorId');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=movie_credits, credits`);
        setActors(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchData();
  }, [name, actorId]);


  if (!actors) {
    return <>Loading....</>;
  }

  return (
    <>
      <Helmet>
        <title>{actors.name} | Biography and Movies - MovieMagic</title>
      </Helmet>

      <div className={style.wrapper}>
        <PersonalInfoSection actors={actors}/>
        <section className={style.right}>
          <BiographySection actors={actors} handleReadMoreClick={handleReadMoreClick} isExpanded={isExpanded}/>
          <section>
            <ActorCreditsFilter actors={actors}/>
          </section>
        </section>
      </div>
    </>
  );
};

export default ActorPage;