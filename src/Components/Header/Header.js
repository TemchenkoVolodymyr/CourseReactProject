import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import CardVideo from "../CardVideo/CardVideo";

const Header = () => {

 let header = useSelector((store) => store.header)
  const jsonDataMedia = useSelector((store) => store.jsonDataMedia);

 const [filmDiscovery, setFilmDiscovery] = useState(null);

  console.log(jsonDataMedia);
  filmDiscovery && console.log(jsonDataMedia.videos);
  filmDiscovery && console.log("1. description: ", jsonDataMedia.videos[0].description);
  filmDiscovery && console.log("2. sources: ", jsonDataMedia.videos[0].sources[0]);
  filmDiscovery && console.log("3. subtitle: ", jsonDataMedia.videos[0].subtitle);
  filmDiscovery && console.log("4. thumb: ", jsonDataMedia.videos[0].thumb);
  filmDiscovery && console.log("5. title: ", jsonDataMedia.videos[0].title);

  //mock useEffect который в будующем пойдет по Api и достанет фильмі из категории Discovery
  useEffect(() => {
    setFilmDiscovery(jsonDataMedia);
  }, []);

  return (
   <div className={"containerListVideos"}>
     <h1>{header}</h1>
    {/*<CardVideo description={null} sources={null} subtitle={null} thumb={null} title={null} />*/}
     {filmDiscovery && jsonDataMedia.videos.map((film)=> <CardVideo key={film.title} description={film.description} sources={film.sources[0]} subtitle={film.subtitle} thumb={film.thumb} title={film.title}/>)}
     {/*{filmDiscovery && jsonDataMedia.videos.map((film)=><p key={film.title}>{film.title}</p>)}*/}
   </div>
  );
};

export default Header;