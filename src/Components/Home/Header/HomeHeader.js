import React from 'react';
import Carousel from "./Carousel/Carousel";
import ItemCarousel from "./Carousel/ItemCarousel";
import style from "./HomeHeader.module.scss"
import TrendingMovies from "./TrendingMovies/TrendingMovies";
import {useSelector} from "react-redux";


const HomeHeader = () => {

  let moviesHeaderCarousel = useSelector((store) => store.headerMovies)

  let styleCarouselContainer = {
    container: {
      height:" 220px",
      width: "860px",
      display: "flex",
      alignItems: "center",
    }
  }

  let styleCarouselTrending = {
    container: {
      height:" 220px",
      display: "flex",
      alignItems: "center",
    }
  }
  let movies = moviesHeaderCarousel.map(movie => <ItemCarousel name={movie.name} category = {movie.category} bg={movie.url} id={movie.id}></ItemCarousel>)

  return (
    <>
      <div >
        <div className={style.header}>
          <h3>Watch movies online</h3>
        </div>
        <Carousel widthBox = "870" styleCss = {styleCarouselContainer}>
          {movies}
        </Carousel>
        <div className={style.header}>
          <h3>Trending now </h3>
        </div>
        <Carousel widthBox = "263"  styleCss = {styleCarouselTrending} maxWidth = "-495">
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
          <TrendingMovies image={"https://th.bing.com/th/id/R.33fc73d4cecb55cfa418ddc25a332672?rik=lSuoz%2fUVfgB0QA&pid=ImgRaw&r=0"}/>
        </Carousel>
      </div>
    </>


  );
};

export default HomeHeader;