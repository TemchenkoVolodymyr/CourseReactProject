import './App.css';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./router/Layout";
import ReduxTestCounter from './Components/reduxTestCounter/ReduxTestCounter';
import {useDispatch,} from "react-redux";
import {useEffect} from "react";
import {jsonAC} from "./redux/json/jsonActions";

import data from "./redux/json/Data.json"
import Home from "./Components/Home/Home";
import NotfoundPage from "./pages/NotfoundPage";
import MovieCarousel from "./Components/Home/Header/Carousel/MovieCarouselLink/MovieCarousel";
import PopularMovies from "./Components/Home/Popular Movies/PopularMovies";
import PopularMoviesPage from "./Components/Home/Popular Movies/PopularMoviesPage/PopularMoviesPage";


function App() {


  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(jsonAC(data))
  }, [data])


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="discovery" element={<Header/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="redux" element={<ReduxTestCounter/>}/>
          <Route path="*" element={<NotfoundPage/>}/>
          <Route path="/:id" element={<MovieCarousel />}></Route>
          <Route path="popularMovies" element={<PopularMoviesPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}


export default App;
