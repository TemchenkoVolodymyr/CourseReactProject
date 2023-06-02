import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CardVideo from "../CardVideo/CardVideo";
import styles from "./Header.module.scss"

const Header = () => {

  // let header = useSelector((store) => store.header)
  const jsonDataMedia = useSelector((store) => store.jsonDataMedia);

  const [filmDiscovery, setFilmDiscovery] = useState(null);


  //mock useEffect который в будующем будет переделан для отправления и получения ответа из Api-кинотеатра и достанет фильмы из категории Discovery
  useEffect(() => {

    setFilmDiscovery(jsonDataMedia);
  }, []);


  return (
    <>
      <h2 className={styles.titleDiscovery}>Discovery</h2>
      <p className={styles.descriptionDiscovery}>
        In this section you will find all genres on our site
      </p>
      <div className={styles.containerListVideos}>
        {/*<h1>{header}</h1>*/}
        {filmDiscovery
          && jsonDataMedia.videos.map((film) =>
            <CardVideo key={film.title} description={film.description}
                       sources={film.sources[0]}
                       subtitle={film.subtitle}
                       thumb={film.thumb} title={film.title}/>)}
      </div>

    </>
  );
};

export default Header;