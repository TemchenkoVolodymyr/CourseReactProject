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
import NotfoundPage from "./pages/NotFoundPage/NotfoundPage";
import MovieCarousel from "./Components/Home/Header/Carousel/MovieCarouselLink/MovieCarousel";
import PopularMoviesPage from "./Components/Home/Popular Movies/PopularMoviesPage/PopularMoviesPage";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import AuthPage from "./pages/AuthPage/AuthPage";
import StatisticsAP from "./Components/AdminPanel/NavComponents/StatisticsAP/StatisticsAP";
import UsersAP from "./Components/AdminPanel/NavComponents/UsersAP/UsersAP";
import MoviesAP from "./Components/AdminPanel/NavComponents/MoviesAP/MoviesAP";
import ActorsAP from "./Components/AdminPanel/NavComponents/ActorsAP";
import GenresAP from "./Components/AdminPanel/NavComponents/GenresAP";
import {removeUser, setUser} from "./redux/slices/userSlice";
import MoviePage from "./pages/MoviePage/MoviePage";
import FreshMoviePage from "./pages/FreshMoviePage";
import TrendingMovies from "./Components/Home/Header/TrendingMovies/TrendingMovies";
import TrendingMovie from "./pages/TrendingMovie";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken
        }));
      } else {
        // User is signed out.
        dispatch(removeUser());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(jsonAC(data))
  }, [data])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="discovery" element={<Header/>}/>
          <Route path="fresh" element={<FreshMoviePage/>}/>
          <Route path="trending" element={<TrendingMovie/>}/>
          <Route path="auth" element={<AuthPage/>}/>
          <Route path="redux" element={<ReduxTestCounter/>}/>
          <Route path="*" element={<NotfoundPage/>}/>
          <Route path="/:id" element={<MovieCarousel />}/>
          <Route path="/movie/:id" element={<MoviePage />}/>
          <Route path="/popMovies" element={<PopularMoviesPage />}></Route>
          <Route path="/adminPanel" element={<AdminPanel />}>
            <Route path="static" element={<StatisticsAP />}/>
            <Route path="users" element={<UsersAP />}/>
            <Route path="movies" element={<MoviesAP />}/>
            <Route path="actors" element={<ActorsAP />}/>
            <Route path="genres" element={<GenresAP />}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}


export default App;
