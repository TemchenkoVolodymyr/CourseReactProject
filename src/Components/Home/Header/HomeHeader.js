import React from 'react';
import Carousel from "./Carousel/Carousel";
import ItemCarousel from "./Carousel/ItemCarousel";
import style from "./HomeHeader.module.scss"
import TrendingMovies from "./TrendingMovies/TrendingMovies";


const HomeHeader = () => {

  let firstUrl = "https://ernoticias.com/wp-content/uploads/2021/08/Screenshot_163-735x400.jpg"
  let secondUrl = "https://i.ytimg.com/vi/jv07MTOq_pE/maxresdefault.jpg"
  let thirdUrl = "https://i.pinimg.com/736x/1f/c9/9a/1fc99a8f239827dd37faa13b94c44f62.jpg"
  let fourthUrl = "https://th.bing.com/th/id/R.3eb771e4d5fcd49fd76e6c38287ea846?rik=oi9lEtGORt114A&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2fmad-max-fury-road.jpg&ehk=XQBaInUTmYru%2fRSmp%2flDpUEcW0Mh%2bUhzqCchN9UEi14%3d&risl=&pid=ImgRaw&r=0"
  let fifthUrl = "https://th.bing.com/th/id/OIP.ZFKirpwtCfe-MNltd-Qv8QHaD4?pid=ImgDet&rs=1"
  let sixtyUrl = "https://th.bing.com/th/id/R.52f598581d76467d61a7609f5292e15c?rik=%2fHSyADgOGDroPw&riu=http%3a%2f%2fwww.filmofilia.com%2fwp-content%2fuploads%2f2011%2f08%2fHobbit-Wallpaper_h1.jpg&ehk=i5TlSBt7Q2CvPUcEG2SwM3%2b86UDy2S%2bGNeQ4KjaKcGA%3d&risl=&pid=ImgRaw&r=0"



  let styleCarouselContainer = {
    container: {
      height:" 220px",
      width: "860px",
      display: "flex",
      alignItems: "center",
    }
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <h3>Watch movies online</h3>
        </div>
        <Carousel widthBox = "870" styleCss = {styleCarouselContainer}>
          <ItemCarousel name={"ENCANTO"} category={"Cartoons Comedy"} bg={firstUrl}/>
          <ItemCarousel name={"Film 2"} category={"Affff"} bg={secondUrl}/>
          <ItemCarousel name={"Film 3"} category={"ADssss"} bg={thirdUrl}/>
          <ItemCarousel name={"Film 4"} category={"ADsqqqsss"} bg={fourthUrl}/>
          <ItemCarousel name={"Film 5"} category={"Tt"} bg={fifthUrl}/>
          <ItemCarousel name={"Film 6"} category={"ADsssasds"} bg={sixtyUrl}/>
        </Carousel>
        <div className={style.header}>
          <h3>Trending now </h3>
        </div>
        <Carousel widthBox = "165"  styleCss = {styleCarouselContainer}>
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